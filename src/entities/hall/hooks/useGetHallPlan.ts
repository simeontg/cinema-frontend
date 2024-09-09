import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getHallPlan } from '../api';
import { HallPlan } from '../model/types';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetHallPlan = <ReturnData = HallPlan>(
    hallId: string,
    sessionId?: string,
    enabled: boolean = true
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['hallPlan', hallId, sessionId],
        queryFn: async () => {
            const hallPlan = await getHallPlan(hallId, sessionId);
            return hallPlan;
        },
        staleTime: STALE_TIME,
        enabled: !!hallId && enabled
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess,
    };
};
