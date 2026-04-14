import express from 'express';
import { detectarIntent } from '../servicios/servicioDialogflow.js';
import { validarMensaje, validarJSON } from '../middleware/validador.js';
import * as registro from '../utilidades/registro.js';

const enrutador = express.Router();

enrutador.post('/chat', validarJSON, validarMensaje, async (requisicion, respuesta) => {
  try {
    registro.info('Solicitud POST /chat recibida');

    const mensaje = requisicion.mensajeValidado;
    const resultado = await detectarIntent(mensaje);

    registro.info('Respuesta generada', { intent: resultado.intent });

    return respuesta.status(200).json({
      exito: true,
      datos: {
        respuesta: resultado.respuesta,
        intent: resultado.intent,
        conMensaje: resultado.exito,
      },
    });
  } catch (excepcion) {
    registro.error('Error en ruta /chat', { error: excepcion.message });
    
    return respuesta.status(500).json({
      exito: false,
      error: 'Error procesando el mensaje',
    });
  }
});

export default enrutador;
