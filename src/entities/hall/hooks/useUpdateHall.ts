import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { updateHall } from '../api';
import { UpdateHallDto } from '../api/types';
import { Hall } from '../model/types';

export const useUpdateHallMutation = () => {
    const mutation = useMutation<Hall, NetworkError, UpdateHallDto>({
        mutationFn: (hallData: UpdateHallDto) => {
            return updateHall(hallData);
        }
    });

    return mutation;
};
