import { $api } from 'shared/api/api';

import { CreateReservationDto, UpdateReservationDto } from '../hooks/types/reservationTypes';

export const createReservation = async (createReservationDto: CreateReservationDto) => {
    const response = await $api.post('/reservation', createReservationDto);
    return response.data;
};

export const updateReservation = async (updateReservationDto: UpdateReservationDto) => {
    const response = await $api.put(
        `/reservation/${updateReservationDto.reservationId}`,
        updateReservationDto
    );
    return response.data;
};
