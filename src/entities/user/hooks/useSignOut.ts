import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLogout } from 'shared/hooks/authHooks';

import { signOutUser } from '../api';

export const useSignOutMutation = () => {
    const queryClient = useQueryClient();
    const { onLogout } = useLogout();

    const mutation = useMutation({
        mutationFn: signOutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onLogout();
        }
    });

    return mutation;
};
