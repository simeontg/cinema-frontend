import { useInfiniteQuery } from '@tanstack/react-query';

import { getPaginatedMovies } from '../api';
import { PaginatedMovies } from '../model/types';
import { InfiniteQueryHookReturnData } from 'shared/types/hook';

export const useGetPaginatedMovies = <ReturnData = PaginatedMovies | null>(releaseType: 'current' | 'upcoming'): InfiniteQueryHookReturnData<ReturnData> => {
    const { data, fetchNextPage, hasNextPage, isError, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['paginatedMovies', releaseType],
        queryFn: getPaginatedMovies,
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.meta;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1
    })

    return {
        data: (data ? data : null) as ReturnData,
        fetchNextPage,
        hasNextPage,
        status,
        isError,
        isFetchingNextPage
    }
};
  