import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getSessions } from '../api';
import { Session } from '../model/types';

export const useGetSessions = <ReturnData = Session[]>(): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const sessions = await getSessions();
            return sessions;
        }
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
