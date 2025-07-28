import axios from 'axios';

export default async function requestApi(config) {
  let response = { result: null, status: true };

  // Client-side-only code
  config.withCredentials = true;

  await axios(config)
    .then(function (res) {
      response = res.data;
    })
    .catch(function (error) {
      response = Promise.reject(error.response.data);
    });
  return response;
}
