import requestApi from '../requestApi';
import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';

const urlPublic = `${URL_API_SISTEC_PUBLIC}configuracion/`;

export function getMenu() {
  const config = {
    method: 'get',
    url: `${urlPublic}menu`, 
    withCredentials: true,
  };

  return requestApi(config);
}
