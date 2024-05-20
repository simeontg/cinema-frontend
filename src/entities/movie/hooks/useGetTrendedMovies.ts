import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getTrendedMovies } from '../api';
import { mapTrendedMovieDTOToTrendedMovie } from '../mappers/movieMappers';
import { TrendedMovie } from '../model/types';

export const useGetTrendedMovies = <
    ReturnData = TrendedMovie[] | null
>(): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const trendedMovies = await getTrendedMovies();
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
