import { create } from 'apisauce';
import mapKeysDeep from 'deep-map-keys';
import { camelCase, snakeCase } from 'lodash';

const { ITUNE_URL } = process.env;
const apiClients = {
  itune: null,
  default: null
};
export const getApiClient = (type = 'itune') => apiClients[type];
export const generateApiClient = (type = 'itune') => {
  switch (type) {
    case 'itune':
      apiClients[type] = createApiClientWithTransForm(ITUNE_URL);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(ITUNE_URL);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
