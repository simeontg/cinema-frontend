export const MOVIES_BASE_URL = process.env.MOVIES_API_URL || 'http://localhost:3001';
export const AUTH_BASE_URL = process.env.AUTH_API_URL || 'http://localhost:3002';
export const GOOGLE_AUTH_URL =
    process.env.GOOGLE_AUTH_URL || 'http://localhost:3002/auth/google/login';
export const RESERVATION_WEBSOCKET_URL =
    process.env.RESERVATION_WEBSOCKET_URL || 'http://localhost:3001/reservation';
export const EXPIRED_TOKEN_ERROR_MESSAGE = 'Token has expired';
export const INVALID_TOKEN_ERROR_MESSAGE = 'Invalid token';
