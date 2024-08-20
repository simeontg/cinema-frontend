import { useMutation } from '@tanstack/react-query';
import { updateReservation } from '../api';
import { Reservation } from '../model/types';
import { UpdateReservationDto } from './types/reservationTypes';


export const useUpdateReservationMutation = () => {
    const mutation = useMutation<Reservation, Error, UpdateReservationDto>({
        mutationFn: (updateReservationDto: UpdateReservationDto) => {
            return updateReservation(updateReservationDto);
        }
    });

    return mutation;
};
