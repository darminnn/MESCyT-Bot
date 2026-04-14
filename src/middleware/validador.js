import * as registro from '../utilidades/registro.js';

const validarMensaje = (requisicion, respuesta, siguiente) => {
  const { message } = requisicion.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    registro.advertencia('Mensaje inválido recibido');
    return respuesta.status(400).json({
      exito: false,
      error: 'El campo "message" es requerido y debe ser texto no vacío',
    });
  }

  requisicion.mensajeValidado = message.trim();
  siguiente();
};

const validarJSON = (requisicion, respuesta, siguiente) => {
  const tipoContenido = requisicion.get('content-type');
  
  if (!tipoContenido || !tipoContenido.includes('application/json')) {
    registro.advertencia('Content-Type inválido');
    return respuesta.status(415).json({
      exito: false,
      error: 'Content-Type debe ser application/json',
    });
  }

  siguiente();
};

export { validarMensaje, validarJSON };
