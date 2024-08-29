import { useMutation } from '@tanstack/react-query';

import { deleteMovie } from '../api';

export const useDeleteMovieMutation = () => {
    const mutation = useMutation({
        mutationFn: (movieId: string) => {
            return deleteMovie(movieId);
        }
    });

    return mutation;
};
