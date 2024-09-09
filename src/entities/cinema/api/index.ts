import { $api } from 'shared/api/api';

import { CreateCinemaDto, UpdateCinemaDto } from './types';

export const getCinemas = async () => {
    const response = await $api.get('/cinema');
    return response.data;
};

export const createCinema = async (createCinemaDto: CreateCinemaDto) => {
    const response = await $api.post('/cinema', createCinemaDto);
    return response.data;
};

export const updateCinema = async (cinemaData: UpdateCinemaDto) => {
    const response = await $api.put(`/cinema/${cinemaData.id}`, cinemaData);
    return response.data;
};

export const deleteCinema = async (cinemaId: string) => {
    const response = await $api.delete(`/cinema/${cinemaId}`);
    return response.data;
};
