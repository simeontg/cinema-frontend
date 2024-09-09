import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { updateMovie } from '../api';
import { UpdateMovieData } from '../api/types';
import { Movie } from '../model/types';

export const useUpdateMovieMutation = () => {
    return useMutation<Movie, NetworkError, UpdateMovieData>({
        mutationFn: (movieData: UpdateMovieData) => {
            const formData = new FormData();
            formData.append('title', movieData.title);
            formData.append('description', movieData.description);
            formData.append('duration', movieData.duration);
            formData.append('genre', movieData.genre);
            formData.append('trended', movieData.trended.toString());

            if (movieData.image) {
                formData.append('image', movieData.image);
            }

            return updateMovie(movieData.movieId, formData);
        }
    });
};
