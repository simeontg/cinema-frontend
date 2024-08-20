import { $api } from 'shared/api/api';

export const getHallPlan = async (hallId: string, sessionId: string) => {
    const response = await $api.get(`/hall/${hallId}/plan?sessionId=${sessionId}`);
    return response.data;
};
