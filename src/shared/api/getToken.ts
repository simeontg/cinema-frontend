import { $authApi } from './api';

export const getToken = async (userId: string) => {
    const response = await $authApi.post(
        '/auth/getToken',
        { userId },
        {
            withCredentials: true
        }
    );

    return response;
};
