const URL = '/api/v1';


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


export const API_PROFILE_ENDPOINTS = {
  PROFILE_GET: `${URL}/profile`,
  PROFILE_UPDATE: `${URL}/profile`,
  PROFILE_UPLOAD_AVATAR: `${URL}/profile/avatar`,
  SETTINGS_GET: `${URL}/settings`,
  SETTINGS_UPDATE: `${URL}/settings`,
  MODELS_GET: `${URL}/settings/models`,
  SUBSCRIPTION_GET: `${URL}/settings/subscription`,
}


export const API_REFERENCE_ENDPOINTS = {
  ANALOG_CREATE_LINK: `${URL}/analog/link`,
  ANALOG_GET_RESULT:  (taskId) => `${URL}/analog/result/${taskId}`,
  ANALOG_COMPARE: `${URL}/analog/compare`,
  ANALOG_COMPARE_RESULT: (taskId) => `${URL}/analog/compare/result/${taskId}`,
}