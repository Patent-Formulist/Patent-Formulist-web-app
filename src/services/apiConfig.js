const API_AUTH_URL = 'http://localhost:8000';
const API_PATENT_URL = 'http://formulinked.ru/api/v1';

export const API_AUTH_ENDPOINTS = {
  LOGIN: `${API_AUTH_URL}/auth/token`,
  REGISTER: `${API_AUTH_URL}/auth/`,
};

export const API_PATENT_ENDPOINTS = {
  PATENT_CREATE: `${API_PATENT_URL}/patent`,
  PATENT_GET_ALL: `${API_PATENT_URL}/patents`,
  PATENT_GET:     (uuid) => `/patent/${uuid}`,  
  PATENT_UPDATE:  (uuid) => `/patent/${uuid}`,   
  PATENT_DELETE:  (uuid) => `/patent/${uuid}`,
};
