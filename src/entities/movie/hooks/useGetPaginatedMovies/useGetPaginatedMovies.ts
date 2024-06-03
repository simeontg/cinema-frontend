import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryHookReturnData } from 'shared/types/hook';

import { getPaginatedMovies } from '../../api';
import { PaginatedMovies } from '../../model/types';
import { MovieReleaseType } from './types';

export const useGetPaginatedMovies = <ReturnData = PaginatedMovies | null>(
    releaseType: MovieReleaseType, limit: number
): InfiniteQueryHookReturnData<ReturnData> => {
    const { data, fetchNextPage, hasNextPage, isError, status, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['paginatedMovies', releaseType, limit],
            queryFn: (({pageParam}) => getPaginatedMovies({page: pageParam, releaseType, limit})),
            getNextPageParam: (lastPage) => {
                const { currentPage, totalPages } = lastPage.meta;
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
            initialPageParam: 1
        });

    return {
        data: (data ? data : null) as ReturnData,
        fetchNextPage,
        hasNextPage,
        status,
        isError,
        isFetchingNextPage
    };
};
