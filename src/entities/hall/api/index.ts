import { $api } from 'shared/api/api';

import { CreateHallDto, UpdateHallDto } from './types';

export const getHallPlan = async (hallId: string, sessionId?: string) => {
    const params: Record<string, string> = {};
    if (sessionId) {
        params.sessionId = sessionId;
    }

    const response = await $api.get(`/hall/${hallId}/plan`, { params });
    return response.data;
};

export const getHallSeatTypes = async (hallId: string) => {
    const response = await $api.get(`/hall/${hallId}/seatTypes`);
    return response.data;
};

export const getHalls = async () => {
    const response = await $api.get('/hall');
    return response.data;
};

export const createHall = async (createHallDto: CreateHallDto) => {
    const response = await $api.post('/hall', createHallDto);
    return response.data;
};

export const updateHall = async (updateHallDto: UpdateHallDto) => {
    const response = await $api.put(`/hall/${updateHallDto.id}`, updateHallDto);
    return response.data;
};

export const deleteHall = async (hallId: string) => {
    const response = await $api.delete(`/hall/${hallId}`);
    return response.data;
};
