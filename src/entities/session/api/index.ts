import { $api } from 'shared/api/api';

import { GetSessionDto } from './types';

export const getSessions = async (): Promise<GetSessionDto[]> => {
    const response = await $api.get(`/session`);
    return response.data;
};

export const getSession = async (id: string): Promise<GetSessionDto> => {
    const response = await $api.get(`/session/${id}`);
    return response.data;
};
