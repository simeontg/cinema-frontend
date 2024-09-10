import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getSessions } from '../api';
import { Session } from '../model/types';

export const useGetSessions = <ReturnData = Session[]>(
    movieId?: string
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['sessions', movieId],
        queryFn: async () => {
            const sessions = await getSessions(movieId);
            return sessions;
        },
        enabled: !!movieId
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
