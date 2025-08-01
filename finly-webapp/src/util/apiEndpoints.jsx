
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL + "/api/v1.0" ;


export const API_ENDPOINTS = {
    LOGIN: `${BASE_API_URL}/login`,
    REGISTER: `${BASE_API_URL}/register`,
    HEALTH: `${BASE_API_URL}/health`,
    ACTIVATE: `${BASE_API_URL}/activate`,
}