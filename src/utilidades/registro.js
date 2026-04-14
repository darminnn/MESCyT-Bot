const registradorLog = (nivel, mensaje, datos = null) => {
  const marca = new Date().toISOString();
  const prefijo = `[${marca}] [${nivel.toUpperCase()}]`;

  if (datos) {
    console.log(`${prefijo} ${mensaje}`, datos);
  } else {
    console.log(`${prefijo} ${mensaje}`);
  }
};

const info = (mensaje, datos) => registradorLog('info', mensaje, datos);
const error = (mensaje, datos) => registradorLog('error', mensaje, datos);
const advertencia = (mensaje, datos) => registradorLog('advertencia', mensaje, datos);
const depuracion = (mensaje, datos) => registradorLog('depuracion', mensaje, datos);

export { info, error, advertencia, depuracion };
