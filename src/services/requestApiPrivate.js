import axios from "axios";

export default async function requestApiPrivate(config) {
  let response = { result: null, status: true };
  await axios(config)
    .then(function (res) {
      response = res.data;
    })
    .catch(function (error) {
      console.log(error);
      response = Promise.reject(error);
    });
  return response;
}
