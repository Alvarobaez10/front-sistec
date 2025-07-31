import { URL_API_SISTEC_PUBLIC } from '@sistec/config/env';
import requestApi from '../requestApi';
import { encode64 } from '@sistec/helpers/base64';

export default async function setLogin(user, password) {
  const config = {
    withCredentials: true,
    method: 'post',
    url: `${URL_API_SISTEC_PUBLIC}auth/login`,
    data: {
      user: encode64(user),
      password: encode64(password),
    },
  };
  return requestApi(config);
}
