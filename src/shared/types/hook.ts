export interface HookReturnData<ReturnedData> {
    data: ReturnedData;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isStale?: boolean;
}
