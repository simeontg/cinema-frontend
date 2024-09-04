import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryHookReturnData } from 'shared/types/hook';
import { PaginatedModel } from 'shared/types/model';

import { getPaginatedMovies } from '../../api';
import { Movie } from '../../model/types';
import { FilterParams, MovieReleaseType } from './types';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetPaginatedMovies = <ReturnData = PaginatedModel<Movie> | null>(
    releaseType: MovieReleaseType,
    limit: number,
    { title, genre }: FilterParams
): InfiniteQueryHookReturnData<ReturnData> => {
    const { data, fetchNextPage, hasNextPage, isError, status, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ['paginatedMovies', releaseType, limit, title, genre],
            queryFn: ({ pageParam }) =>
                getPaginatedMovies({
                    page: pageParam,
                    releaseType,
                    limit,
                    title,
                    genre
                }),
            getNextPageParam: (lastPage) => {
                const { currentPage, totalPages } = lastPage.meta;
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
            initialPageParam: 1,
            staleTime: STALE_TIME
        });

    return {
        data: (data ? data : null) as ReturnData,
        fetchNextPage,
        hasNextPage,
        status,
        isError,
        isFetchingNextPage,
        isLoading
    };
};
