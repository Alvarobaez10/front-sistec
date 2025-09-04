import requestApi from '../requestApi';
import encode64 from '@sistec/helpers/utils'
import { URL_API_SISTEC_SSR } from '@sistec/config/env';

const urlPrivate = `${URL_API_SISTEC_SSR}configuracion/`;

export function getPageJsonConfiguration(origen, codigo) {
  const config = {
    method: 'get',
    url: `${urlPrivate}${origen}`,
    params: { codigo: encode64(String(codigo)) },
    withCredentials: true,
  };

  return requestApi(config)
}
