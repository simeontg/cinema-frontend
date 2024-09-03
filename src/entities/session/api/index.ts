import { $api } from 'shared/api/api';

import { CreateSessionDto, GetSessionDto, UpdateSessionDto } from './types';

export const getSessions = async (movieId?: string): Promise<GetSessionDto[]> => {
    const response = await $api.get(`/session?movieId=${movieId}`);
    return response.data;
};

export const getSession = async (id: string): Promise<GetSessionDto> => {
    const response = await $api.get(`/session/${id}`);
    return response.data;
};

export const createSession = async (sessionData: CreateSessionDto) => {
    const response = await $api.post('/session', sessionData);
    return response.data;
};

export const updateSession = async (sessionData: UpdateSessionDto) => {
    const response = await $api.put(`/session/${sessionData.id}`, sessionData);
    return response.data;
};

export const deleteSession = async (sessionId: string) => {
    const response = await $api.delete(`/session/${sessionId}`);
    return response.data;
}