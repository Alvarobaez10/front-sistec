import encode64 from '@sistec/helpers/utils';
import requestApi from '../requestApi';
const urlAPI = process.env.NEXT_PUBLIC_URL_API_SISTEC;


export async function getData(endpoint, codigo, filters, page, limit, token) {
  const url = `${urlAPI}${endpoint}`;
  const config = {
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filters: encode64(JSON.stringify(filters)),
      page: encode64(page),
      limit: encode64(limit),
      codigo: encode64(codigo),
    },
  };
  const result = await requestApi(config);
  return result;
}

export async function getDataId(endpoint, codigo, id, token) {
  const url = `${urlAPI}${endpoint}/${id}`;
  const config = {
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      codigo: encode64(codigo),
    },
  };
  const result = await requestApi(config);
  return result;
}

export async function postData(endpoint, codigo, id, datosForm, token) {
  const url = `${urlAPI}${endpoint}`;
  const config = {
    method: 'post',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      codigo: encode64(codigo),
      datosForm: encode64(JSON.stringify(datosForm)),
      id: encode64(id),
    },
  };
  const result = await requestApi(config);
  return result;
}

export async function putData(endpoint, codigo, id, datosForm, token) {
  const url = `${urlAPI}${endpoint}/${id}`;
  const config = {
    method: 'put',
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      codigo: encode64(codigo),
      datosForm: encode64(JSON.stringify(datosForm)),
    },
  };
  const result = await requestApi(config);
  return result;
}
