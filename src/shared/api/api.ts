import axios from 'axios';

import { MOVIES_BASE_URL } from 'shared/constants/api';

export const $api = axios.create({
    baseURL: MOVIES_BASE_URL
});
