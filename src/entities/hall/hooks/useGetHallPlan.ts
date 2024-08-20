import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getHallPlan } from '../api';
import { HallPlan } from '../model/HallPlan';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetHallPlan = <ReturnData = HallPlan>(
    hallId: string,
    sessionId: string
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['hallPlan', sessionId],
        queryFn: async () => {
            const hallPlan = await getHallPlan(hallId, sessionId);
            return hallPlan;
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
