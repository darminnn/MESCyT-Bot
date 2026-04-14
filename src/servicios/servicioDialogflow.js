import clienteDialogflow from '../config/dialogflow.js';
import variables from '../config/variables.js';
import { cargarFaqs, cargarFallback } from '../utilidades/cargadores.js';
import * as registro from '../utilidades/registro.js';

let cacheFaqs = null;
let cacheFallback = null;

const obtenerFaqs = () => {
  if (!cacheFaqs) {
    cacheFaqs = cargarFaqs();
  }
  return cacheFaqs;
};

const obtenerFallback = () => {
  if (!cacheFallback) {
    cacheFallback = cargarFallback();
  }
  return cacheFallback;
};

const construirRutaSesion = (sesionId) => {
  return `projects/${variables.googleProjectId}/agent/sessions/${sesionId}`;
};

const mapearIntentARespuesta = (nombreIntent) => {
  const faqs = obtenerFaqs();
  const respuestaFaq = faqs.find(faq => faq.intent === nombreIntent);

  if (respuestaFaq) {
    return {
      exito: true,
      respuesta: respuestaFaq.answer,
      intent: nombreIntent,
    };
  }

  const fallback = obtenerFallback();
  return {
    exito: false,
    respuesta: fallback.fallback,
    intent: 'fallback',
  };
};

const detectarIntent = async (mensaje, sesionId = variables.dialogflowSessionId) => {
  try {
    registro.info('Iniciando detección de intent', { mensaje, sesionId });

    const rutaSesion = construirRutaSesion(sesionId);

    const solicitud = {
      session: rutaSesion,
      queryInput: {
        text: {
          text: mensaje,
          languageCode: variables.dialogflowLanguageCode,
        },
      },
    };

    const respuestas = await clienteDialogflow.detectIntent(solicitud);

    if (!respuestas || respuestas.length === 0) {
      registro.advertencia('No se obtuvo respuesta de Dialogflow');
      return mapearIntentARespuesta('fallback');
    }

    const respuestaDetectada = respuestas[0];
    const resultado = respuestaDetectada.queryResult;

    if (!resultado || !resultado.intent) {
      registro.advertencia('No se detectó intent en la respuesta');
      return mapearIntentARespuesta('fallback');
    }

    const nombreIntent = resultado.intent.displayName;
    const confianza = resultado.intentDetectionConfidence;

    registro.info('Intent detectado', { nombreIntent, confianza });

    return mapearIntentARespuesta(nombreIntent);
  } catch (excepcion) {
    registro.error('Error en detección de intent', {
      error: excepcion.message,
    });
    
    return {
      exito: false,
      respuesta: obtenerFallback().fallback,
      intent: 'fallback',
      error: excepcion.message,
    };
  }
};

export { detectarIntent };
