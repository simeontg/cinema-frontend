import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getSession } from '../api';
import { Session } from '../model/types';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetSession = <ReturnData = Session>(
    id: string
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const session = await getSession(id);
            return session;
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
