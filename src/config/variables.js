import dotenv from 'dotenv';

dotenv.config();

const obtenerVariablesEntorno = () => {
  const variablesRequeridas = [
    'PORT',
    'NODE_ENV',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'DIALOGFLOW_SESSION_ID',
  ];

  const variablesNoDefinidas = variablesRequeridas.filter(
    variable => !process.env[variable]
  );

  if (variablesNoDefinidas.length > 0) {
    throw new Error(
      `Variables de entorno no definidas: ${variablesNoDefinidas.join(', ')}`
    );
  }

  return {
    puerto: parseInt(process.env.PORT, 10),
    entorno: process.env.NODE_ENV,
    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    dialogflowSessionId: process.env.DIALOGFLOW_SESSION_ID,
    dialogflowLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE || 'es-ES',
  };
};

export default obtenerVariablesEntorno();
