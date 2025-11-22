import requestApi from '../requestApi';
import encode64 from '@sistec/helpers/utils';
import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';

const urlPublic = `${URL_API_SISTEC_PUBLIC}`;

export function getMateriales(token , datosUsuario = {}) {
  const config = {
    method: 'get',
    url: `${urlPublic}elementos`, 
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      datosUsuario: encode64(JSON.stringify(datosUsuario)),
    },
  };
  return requestApi(config);
}
