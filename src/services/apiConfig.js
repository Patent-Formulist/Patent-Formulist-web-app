import { APP_CONFIG } from './appConfig'

const URL = APP_CONFIG.USE_OFFLINE_MODE 
  ? 'mock://localhost/api/v1' 
  : '/api/v1'

export const API_AUTH_ENDPOINTS = {
  LOGIN: `${URL}/login`,
  REGISTER: `${URL}/registration`,
  REFRESH: `${URL}/refresh`,
  LOGOUT: `${URL}/logout`,
  VALIDATE: `${URL}/validate`
}

export const API_PATENT_ENDPOINTS = {
  PATENT_GET_ALL: `${URL}/patents`,
  PATENT_GET: (uuid) => `${URL}/patents/${uuid}`,
  PATENT_CREATE: `${URL}/patents`,
  PATENT_EDIT: (uuid) => `${URL}/patents/${uuid}`,
  PATENT_DELETE: (uuid) => `${URL}/patents/${uuid}`
}

export const API_REFERENCE_ENDPOINTS = {
  ANALOG_CREATE_LINK: `${URL}/analog/link`,
  ANALOG_GET_RESULT: (taskId) => `${URL}/analog/link/${taskId}`,
  ANALOG_CREATE_COMPARE: `${URL}/analog/compare`,
  ANALOG_GET_COMPARE_RESULT: (taskId) => `${URL}/analog/compare/${taskId}`,
  PROTOTYPE_SET: `${URL}/prototype`,
  PROTOTYPE_GET: (patentId) => `${URL}/prototype/${patentId}`
}

export const API_PROFILE_ENDPOINTS = {
  PROFILE_GET: `${URL}/profile`,
  PROFILE_UPDATE: `${URL}/profile`,
  PROFILE_AVATAR_UPLOAD: `${URL}/profile/avatar`,
  SETTINGS_GET: `${URL}/settings`,
  SETTINGS_UPDATE: `${URL}/settings`,
  AI_MODELS_GET: `${URL}/ai-models`
}