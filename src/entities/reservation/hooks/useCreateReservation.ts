import { useMutation } from '@tanstack/react-query';
import { CreateReservationDto } from './types/reservationTypes';
import { createReservation } from '../api';
import { Reservation } from '../model/types';


export const useCreateReservationMutation = () => {
    const mutation = useMutation<Reservation, Error, CreateReservationDto>({
        mutationFn: (createReservationData: CreateReservationDto) => {
            return createReservation(createReservationData);
        }
    });

    return mutation;
};
