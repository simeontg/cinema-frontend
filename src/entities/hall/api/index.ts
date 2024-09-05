import { $api } from 'shared/api/api';

export const getHallPlan = async (hallId: string, sessionId: string) => {
    const response = await $api.get(`/hall/${hallId}/plan?sessionId=${sessionId}`);
    return response.data;
};

export const getHallSeatTypes = async (hallId: string) => {
    const response = await $api.get(`/hall/${hallId}/seatTypes`);
    return response.data;
};
