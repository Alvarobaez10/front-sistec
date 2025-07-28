import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';
import requestApi from '../requestApi';

export default async function validateSession() {
  const config = {
    method: 'post',
    url: `${URL_API_SISTEC_PUBLIC}validate-session`,
    withCredentials: true,
  };
  return requestApi(config);
}
