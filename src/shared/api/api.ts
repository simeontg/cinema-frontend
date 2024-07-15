import axios from 'axios';

import { AUTH_BASE_URL, MOVIES_BASE_URL } from 'shared/constants/api';

export const $api = axios.create({
    baseURL: MOVIES_BASE_URL
});

export const $authApi = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true
});
