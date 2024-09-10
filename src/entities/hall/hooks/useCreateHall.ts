import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { createHall } from '../api';
import { CreateHallDto } from '../api/types';
import { Hall } from '../model/types';

export const useCreateHallMutation = () => {
    const mutation = useMutation<Hall, NetworkError, CreateHallDto>({
        mutationFn: (hallData: CreateHallDto) => {
            return createHall(hallData);
        }
    });

    return mutation;
};
