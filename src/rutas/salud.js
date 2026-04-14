import express from 'express';
import * as registro from '../utilidades/registro.js';

const enrutador = express.Router();

enrutador.get('/salud', (requisicion, respuesta) => {
  registro.info('Solicitud GET /salud');
  
  respuesta.status(200).json({
    exito: true,
    estado: 'operativo',
    marca: new Date().toISOString(),
  });
});

enrutador.get('/', (requisicion, respuesta) => {
  respuesta.status(200).json({
    nombre: 'Bot MESCyT API',
    version: '1.0.0',
    estado: 'activo',
  });
});

export default enrutador;
