import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getHalls } from '../api';
import { Hall } from '../model/types';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetHalls = <ReturnData = Hall[]>(): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['halls'],
        queryFn: async () => {
            const halls = await getHalls();
            return halls;
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
