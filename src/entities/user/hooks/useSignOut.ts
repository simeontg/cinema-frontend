import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLogout } from 'shared/hooks/authHooks';

import { signOutUser } from '../api';
import { Routes, RoutesPaths } from 'shared/constants/router';

export const useSignOutMutation = () => {
    const queryClient = useQueryClient();
    const { onLogout } = useLogout();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signOutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onLogout();
            navigate(RoutesPaths[Routes.MAIN]);
        }
    });

    return mutation;
};
