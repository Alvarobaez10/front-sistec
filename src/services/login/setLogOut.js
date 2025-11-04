import { URL_API_SISTEC_AUTH } from '@sistec/config/env';
import requestApi from "../requestApi";

export default async function setLogOut() {
  const config = {
    method: 'post',
    url: `${URL_API_SISTEC_AUTH}logout`,
  };
  return requestApi(config);
}
