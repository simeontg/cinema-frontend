import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getUserReservations } from '../api';
import { Reservation } from '../model/types';

export const useGetUserReservations = <ReturnData = Reservation[]>(
    fetchExpired: boolean
): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['userReservations'],
        queryFn: async () => {
            const userReservations = await getUserReservations(fetchExpired);
            return userReservations;
        }
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
