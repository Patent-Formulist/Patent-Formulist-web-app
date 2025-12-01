const URL = '/api';

export const API_AUTH_ENDPOINTS = {
  LOGIN:    `${URL}/login`,
  REGISTER: `${URL}/registration`,
  REFRESH:  `${URL}/refresh`,
  LOGOUT:   `${URL}/logout`,
  VALIDATE: `${URL}/validate`
};

export const API_PATENT_ENDPOINTS = {
  PATENT_CREATE:  `${URL}/patent`,
  PATENT_GET_ALL: `${URL}/patents`,
  PATENT_GET:     (uuid) => `${URL}/patent/${uuid}`,
  PATENT_UPDATE:  (uuid) => `${URL}/patent/${uuid}`,
  PATENT_DELETE:  (uuid) => `${URL}/patent/${uuid}`,
};