import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getHallSeatTypes } from '../api';

export const useGetHallSeatTypes = <ReturnData = string[]>(
    hallId: string
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['hallSeatTypes', hallId],
        queryFn: async () => {
            const hallSeatTypes = await getHallSeatTypes(hallId);
            return hallSeatTypes;
        },
        enabled: !!hallId
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
