
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL + "/api/v1.0" ;

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const API_ENDPOINTS = {
    LOGIN: `${BASE_API_URL}/login`,
    REGISTER: `${BASE_API_URL}/register`,
    GET_USER_INFO: `${BASE_API_URL}/profile`,
    UPDATE_PROFILE: `${BASE_API_URL}/profile`,
    UPDATE_PASSWORD: `${BASE_API_URL}/profile/password`,
    HEALTH: `${BASE_API_URL}/health`,
    ACTIVATE: `${BASE_API_URL}/activate`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_CATEGORIES: `${BASE_API_URL}/categories`,
    CATEGORY: `${BASE_API_URL}/categories`,
    INCOME: `${BASE_API_URL}/incomes`,
    EXPENSE: `${BASE_API_URL}/expenses`,
    DASHBOARD: `${BASE_API_URL}/dashboard/dashboard-data`,
    SEND_VERIFICATION_CODE: `${BASE_API_URL}/reset-email`,
    RESET_PASSWORD: `${BASE_API_URL}/reset-password`,
}