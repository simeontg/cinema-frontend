import { $api } from 'shared/api/api';
import { PaginatedDto } from 'shared/types/dto';

import { GetMovieDto, GetPaginatedMoviesParams, GetTrendedMovieDTO } from './types';

export const getTrendedMovies = async (): Promise<GetTrendedMovieDTO[]> => {
    const response = await $api.get<GetTrendedMovieDTO[]>('/movies/trended');
    return response.data;
};

export const getPaginatedMovies = async ({
    page,
    releaseType,
    limit
}: GetPaginatedMoviesParams): Promise<PaginatedDto<GetMovieDto>> => {
    const response = await $api.get(
        `/movies?page=${page}&limit=${limit}${releaseType ? `&releaseType=${releaseType}` : ''}`
    );
    return response.data;
};
