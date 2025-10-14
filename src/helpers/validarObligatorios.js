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

      if (field.hidden) continue;

      if (
        field.required &&
        !field.hidden &&
        (!value || value === -1 || value === '-1' || JSON.stringify(value) === '[]')
      ) {
        mensaje = field['data-title-obligatorio']
          ? field['data-title-obligatorio']
          : field.title.replace('*', '') + ' es obligatorio';
        break;
      } else if (field.required && field.type === 'email' && !esCorreoValido(value ?? '')) {
        mensaje = field.title.replace('*', '') + ' debe ser un correo electrónico válido';
        break;
      } else if (field.required && field.type === 'password') {
        if (!field.confirmPassword) {
          const { isValid, errors } = validatePassword(value ?? '');
          if (!isValid) {
            mensaje = `${field.title.replace('*', '')} no es válida. 
          ${errors.join('\n')}`;
            break;
          }
        }
      }
    }
  }

  if (!mensaje && config.jsValidation) {
    try {
      const fnValidacion = eval(config.jsValidation);
      mensaje = fnValidacion();
      // eslint-disable-next-line no-empty
    } catch (e){
      console.log(e);
      console.error('Ocurrió un error en la validación adicional');
    }
  }
  // console.log("validarObligatorios.js mensaje", mensaje);
  return mensaje;
}

export function esCorreoValido(correo) {
  const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('Debe tener al menos 8 caracteres.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una letra mayúscula.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una letra minúscula.');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número.');
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
