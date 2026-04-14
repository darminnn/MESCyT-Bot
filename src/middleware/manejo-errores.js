import * as registro from '../utilidades/registro.js';

const manejadorErrorGlobal = (error, requisicion, respuesta, siguiente) => {
  registro.error('Error no capturado', { error: error.message, pila: error.stack });

  respuesta.status(500).json({
    exito: false,
    error: 'Error interno del servidor',
    solicitud_id: requisicion.id || 'sin-id',
  });
};

const manejador404 = (requisicion, respuesta) => {
  registro.advertencia('Ruta no encontrada', { ruta: requisicion.path });
  
  respuesta.status(404).json({
    exito: false,
    error: 'Ruta no encontrada',
    ruta: requisicion.path,
  });
};

export { manejadorErrorGlobal, manejador404 };
