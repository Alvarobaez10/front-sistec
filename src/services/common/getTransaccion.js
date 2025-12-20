import encode64 from '@sistec/helpers/utils'
import requestApi from '../requestApi';
import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';

const urlPublic = `${URL_API_SISTEC_PUBLIC}`;

export function getTransaccion(token, filtrosData) {

  const config = {
    method: 'get',
    url: `${urlPublic}transaccion`, 
    params: { codigo: encode64(JSON.stringify(filtrosData)) },
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return requestApi(config);
}
