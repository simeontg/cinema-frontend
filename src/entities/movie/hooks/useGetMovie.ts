import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getMovie } from '../api';
import { Movie } from '../model/types';

export const useGetMovie = <ReturnData = Movie>(id: string): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const movie = await getMovie(id);
            return movie;
        },
        staleTime: 10 * (60 * 1000)
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
