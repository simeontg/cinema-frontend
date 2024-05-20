import { useQuery } from '@tanstack/react-query';
import { $api } from 'shared/api/api';
import { MOVIES_BASE_URL } from 'shared/constants/api';
import { GetTrendedMovieDTO } from '../api/types';
import { mapTrendedMovieDTOToTrendedMovie } from '../mappers/movieMappers';
import { HookReturnData } from 'shared/types/hook';
import { TrendedMovie } from '../model/types';

export const useGetTrendedMovies = <
    ReturnData = TrendedMovie[] | null
>(): HookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const response = await $api.get<GetTrendedMovieDTO[]>(
                `${MOVIES_BASE_URL}/movies/trended`
            );
            const trendedMovies = response.data;
            return trendedMovies.map(mapTrendedMovieDTOToTrendedMovie);
        }
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
