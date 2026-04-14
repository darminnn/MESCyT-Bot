import express from 'express';
import variables from './config/variables.js';
import enrutadorChat from './rutas/chat.js';
import enrutadorSalud from './rutas/salud.js';
import { manejadorErrorGlobal, manejador404 } from './middleware/manejo-errores.js';
import * as registro from './utilidades/registro.js';

const aplicacion = express();

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.use(enrutadorSalud);
aplicacion.use(enrutadorChat);

aplicacion.use(manejador404);
aplicacion.use(manejadorErrorGlobal);

const iniciarServidor = () => {
  try {
    aplicacion.listen(variables.puerto, () => {
      registro.info(`Servidor iniciado en puerto ${variables.puerto}`, {
        entorno: variables.entorno,
      });
    });
  } catch (excepcion) {
    registro.error('Error al iniciar servidor', { error: excepcion.message });
    process.exit(1);
  }
};

process.on('SIGTERM', () => {
  registro.info('SIGTERM recibido, cerrando servidor');
  process.exit(0);
});

process.on('SIGINT', () => {
  registro.info('SIGINT recibido, cerrando servidor');
  process.exit(0);
});

iniciarServidor();
