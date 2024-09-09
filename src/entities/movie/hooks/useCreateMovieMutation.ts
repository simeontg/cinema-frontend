import { useMutation } from '@tanstack/react-query';

import { createMovie } from '../api';
import { CreateMovieData } from '../api/types';
import { NetworkError } from 'shared/types/network';
import { Movie } from '../model/types';

export const useCreateMovieMutation = () => {
    return useMutation<Movie, NetworkError, CreateMovieData>({
        mutationFn: (movieData: CreateMovieData) => {
            const formData = new FormData();
            formData.append('title', movieData.title);
            formData.append('description', movieData.description);
            formData.append('duration', movieData.duration);
            formData.append('genre', movieData.genre);
            formData.append('releaseDate', movieData.releaseDate);
            formData.append('image', movieData.image);
            formData.append('trended', movieData.trended.toString());

            return createMovie(formData);
        }
    });
};
