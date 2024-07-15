import { useQuery } from '@tanstack/react-query';

import { QueryHookReturnData } from 'shared/types/hook';

import { getUser } from '../api';
import { User } from '../model/types';

export const useGetUser = <ReturnData = User>(): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await getUser();
            return user;
        }
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
};
