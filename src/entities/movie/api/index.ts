import { $api } from 'shared/api/api';
import { PaginatedDto } from 'shared/types/dto';
import { createSearchParams } from 'shared/utils/createSearchParams';

import { GetMovieDto, GetPaginatedMoviesParams, GetTrendedMovieDTO } from './types';

export const getTrendedMovies = async (): Promise<GetTrendedMovieDTO[]> => {
    const response = await $api.get<GetTrendedMovieDTO[]>('/movies/trended');
    return response.data;
};

export const getPaginatedMovies = async ({
    page,
    releaseType,
    limit,
    title,
    genre
}: GetPaginatedMoviesParams): Promise<PaginatedDto<GetMovieDto>> => {
    const searchParams = createSearchParams({ page, releaseType, limit, title, genre });

    const response = await $api.get(`/movies`, {
        params: searchParams
    });
    return response.data;
};

export const getMovie = async (id: string): Promise<GetMovieDto> => {
    const response = await $api.get(`/movies/${id}`);
    return response.data;
};

export const createMovie = async (formData: FormData) => {
    const response = await $api.post('/movies', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updateMovie = async (movieId: string, formData: FormData) => {
    const response = await $api.put(`/movies/${movieId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deleteMovie = async (movieId: string) => {
    const response = await $api.delete(`/movies/${movieId}`);
    return response.data;
};
