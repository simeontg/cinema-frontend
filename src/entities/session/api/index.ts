import { $api } from 'shared/api/api';

import { GetSessionDto } from './types';

export const getSessions = async (): Promise<GetSessionDto> => {
    const response = await $api.get(`/session`);

    return response.data;
};
