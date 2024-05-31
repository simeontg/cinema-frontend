import { $api } from 'shared/api/api';

import { GetPaginatedMoviesDto, GetTrendedMovieDTO } from './types';

export const getTrendedMovies = async (): Promise<GetTrendedMovieDTO[]> => {
    const response = await $api.get<GetTrendedMovieDTO[]>('/movies/trended');
    return response.data;
};

export const getPaginatedMovies = async ({
    pageParam = 1,
    queryKey
}: {
    pageParam: number;
    queryKey: string[];
}): Promise<GetPaginatedMoviesDto> => {
    const [, releaseType] = queryKey;
    const response = await $api.get(
        `/movies?page=${pageParam}&limit=18${releaseType ? `&releaseType=${releaseType}` : ''}`
    );
    return response.data;
};
