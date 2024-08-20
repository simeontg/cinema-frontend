import { useMutation } from '@tanstack/react-query';

import { createReservation } from '../api';
import { Reservation } from '../model/types';
import { CreateReservationDto } from './types/reservationTypes';

export const useCreateReservationMutation = () => {
    const mutation = useMutation<Reservation, Error, CreateReservationDto>({
        mutationFn: (createReservationData: CreateReservationDto) => {
            return createReservation(createReservationData);
        }
    });

    return mutation;
};
