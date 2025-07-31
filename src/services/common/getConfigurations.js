import requestApi from '../requestApi';
import encode64 from '@sistec/helpers/utils'
import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env'

const urlPublic = `${URL_API_SISTEC_PUBLIC}configuracion/`

export function getPageJsonConfiguration(origen, codigo) {
  debugger;
  const config = {
    method: 'get',
    url: `${urlPublic}${origen}`,
    params: { codigo: encode64(String(codigo)) },
    withCredentials: true,
  }

  return requestApi(config)
}
