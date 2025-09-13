import requestApi from '../requestApi';
import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';

const urlPublic = `${URL_API_SISTEC_PUBLIC}`;

export function getMateriales(token) {
  const config = {
    method: 'get',
    url: `${urlPublic}elementos`, 
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return requestApi(config);
}
