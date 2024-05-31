import { InfiniteQueryObserverResult } from "@tanstack/react-query";

export interface QueryHookReturnData<ReturnedData> {
    data: ReturnedData;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isStale?: boolean;
}

export interface InfiniteQueryHookReturnData<ReturnedData> {
    data: ReturnedData;
    isError?: boolean;
    status?: string;
    isStale?: boolean;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}