import { useMutation } from '@tanstack/react-query';

import { createMovie, updateMovie } from '../api';
import { CreateOrUpdateMovieData } from '../api/types';

export const useMovieMutation = () => {
    const mutation = useMutation({
        mutationFn: (movieData: CreateOrUpdateMovieData) => {
            const formData = new FormData();

            formData.append('title', movieData.title);
            formData.append('description', movieData.description);
            formData.append('duration', movieData.duration);
            formData.append('genre', movieData.genre);
            formData.append('releaseDate', movieData.releaseDate);
            formData.append('trended', movieData.trended.toString());

            if (movieData.image) {
                formData.append('image', movieData.image);
            }

            if (movieData.movieId) {
                return updateMovie(movieData.movieId, formData);
            } else {
                return createMovie(formData);
            }
        }
    });

    return mutation;
};
