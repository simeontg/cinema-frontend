import { useMutation } from '@tanstack/react-query';

import { deleteHall } from '../api';

export const useDeleteHallMutation = () => {
    const mutation = useMutation({
        mutationFn: (hallId: string) => {
            return deleteHall(hallId);
        }
    });

    return mutation;
};
