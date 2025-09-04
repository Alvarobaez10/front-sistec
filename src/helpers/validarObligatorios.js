export default function validarObligatorios(config, datos) {
  let mensaje = '';
  if (config.sections) {
    for (const section in config.sections) {
      const fields = config.sections[section].fields;
      for (const key in fields) {
        const field = fields[key];
        const value = datos?.[section]?.[key];
        if (
          field.required &&
          (value === null ||
            value === 'undefined' ||
            value === -1 ||
            value === '-1' ||
            JSON.stringify(value) === '[]')
        ) {
          mensaje = field['data-title-obligatorio']
            ? field['data-title-obligatorio']
            : field.title.replace('*', '') + ' es obligatorio';
          break;
        }
      }
      if (mensaje) {
        break;
      }
    }
  } else {
    const fields = config.fields;
    for (const key in fields) {
      const field = fields[key];
      const value = datos?.[key];

      if(field.hidden) continue;

      if (
        field.required &&
        (!value || value === -1 || value === '-1' || JSON.stringify(value) === '[]')
      ) {
        mensaje = field['data-title-obligatorio']
          ? field['data-title-obligatorio']
          : field.title.replace('*', '') + ' es obligatorio';
        break;
      } else if (field.required && field.type === 'email' && !esCorreoValido(value ?? '')) {
        mensaje = field.title.replace('*', '') + ' debe ser un correo electrónico válido';
        break;
      }
    }
  }

  if (!mensaje && config.jsValidation) {
    try {
      const fnValidacion = eval(config.jsValidation);
      mensaje = fnValidacion();
      // eslint-disable-next-line no-empty
    } catch {}
  }
  // console.log("validarObligatorios.js mensaje", mensaje);
  return mensaje;
}


export function esCorreoValido(correo) {
  const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}
