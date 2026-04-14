import dialogflow from '@google-cloud/dialogflow';
import variables from './variables.js';

const crearClienteDialogflow = () => {
  const credenciales = {
    projectId: variables.googleProjectId,
    credentials: {
      type: 'service_account',
      project_id: variables.googleProjectId,
      private_key: variables.googlePrivateKey,
      client_email: variables.googleClientEmail,
    },
  };

  return new dialogflow.v2.SessionsClient({
    credentials: credenciales.credentials,
  });
};

export default crearClienteDialogflow();
