import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { createCinema } from '../api';
import { CreateCinemaDto } from '../api/types';
import { Cinema } from '../model/types';

export const useCreateCinemaMutation = () => {
    const mutation = useMutation<Cinema, NetworkError, CreateCinemaDto>({
        mutationFn: (cinemaData: CreateCinemaDto) => {
            return createCinema(cinemaData);
        }
    });

    return mutation;
};
