const API_BASE_URL = 'http://formulinked.ru/api/v1';

export const API_AUTH_ENDPOINTS = {
  LOGIN:    `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/registration`,
};

export const API_PATENT_ENDPOINTS = {
  PATENT_CREATE:  `${API_BASE_URL}/patent`,
  PATENT_GET_ALL: `${API_BASE_URL}/patents`,
  PATENT_GET:     (uuid) => `${API_BASE_URL}/patent/${uuid}`,
  PATENT_UPDATE:  (uuid) => `${API_BASE_URL}/patent/${uuid}`,
  PATENT_DELETE:  (uuid) => `${API_BASE_URL}/patent/${uuid}`,
};