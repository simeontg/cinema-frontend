import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signOutUser } from '../api';

export const useSignOut = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: signOutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    return mutation;
};
