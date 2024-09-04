import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';
import { Cinema } from '../model/types';
import { getCinemas } from '../api';

const STALE_TIME = 10 * (60 * 1000); // 10 minutes

export const useGetCinemas = <ReturnData = Cinema[]>(): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['cinemas'],
        queryFn: async () => {
            const cinemas = await getCinemas();
            return cinemas;
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
