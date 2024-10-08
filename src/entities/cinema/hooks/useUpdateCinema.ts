import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { updateCinema } from '../api';
import { UpdateCinemaDto } from '../api/types';
import { Cinema } from '../model/types';

export const useUpdateCinemaMitation = () => {
    const mutation = useMutation<Cinema, NetworkError, UpdateCinemaDto>({
        mutationFn: (cinemaData: UpdateCinemaDto) => {
            return updateCinema(cinemaData);
        }
    });

    return mutation;
};
