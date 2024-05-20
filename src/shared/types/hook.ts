export interface QueryHookReturnData<ReturnedData> {
    data: ReturnedData;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isStale?: boolean;
}
