import axios from 'axios';

import {
    AUTH_BASE_URL,
    EXPIRED_TOKEN_ERROR_MESSAGE,
    INVALID_TOKEN_ERROR_MESSAGE,
    MOVIES_BASE_URL
} from 'shared/constants/api';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/storage';
import storageService from 'shared/services/storageService';

import { getToken } from './getToken';

export const $api = axios.create({
    baseURL: MOVIES_BASE_URL,
    withCredentials: true
});

export const $authApi = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true
});

$authApi.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.data.msg === EXPIRED_TOKEN_ERROR_MESSAGE &&
            error.config &&
            !error.config._isRetry
        ) {
            const { userId } = error.response.data;
            originalRequest._isRetry = true;
            try {
                await getToken(userId);
                return $authApi.request(originalRequest);
            } catch (error) {
                storageService.removeItem(USER_LOCALSTORAGE_KEY);
                throw error;
            }
        }

        if (error.response.data.msg === INVALID_TOKEN_ERROR_MESSAGE) {
            storageService.removeItem(USER_LOCALSTORAGE_KEY);
        }

        throw error;
    }
);

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.data.msg === EXPIRED_TOKEN_ERROR_MESSAGE &&
            error.config &&
            !error.config._isRetry
        ) {
            const { userId } = error.response.data;
            originalRequest._isRetry = true;
            try {
                await getToken(userId);
                return $api.request(originalRequest);
            } catch (error) {
                storageService.removeItem(USER_LOCALSTORAGE_KEY);
                throw error;
            }
        }

        if (error.response.data.msg === INVALID_TOKEN_ERROR_MESSAGE) {
            storageService.removeItem(USER_LOCALSTORAGE_KEY);
        }

        throw error;
    }
);
