import { useMutation } from '@tanstack/react-query';

import { deleteCinema } from '../api';

export const useDeleteCinemaMutation = () => {
    const mutation = useMutation({
        mutationFn: (cinemaId: string) => {
            return deleteCinema(cinemaId);
        }
    });

    return mutation;
};
