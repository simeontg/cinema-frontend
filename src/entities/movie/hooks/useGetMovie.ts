import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getMovie } from '../api';
import { Movie } from '../model/types';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetMovie = <ReturnData = Movie>(id: string): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const movie = await getMovie(id);
            return movie;
        },
        staleTime: STALE_TIME
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
