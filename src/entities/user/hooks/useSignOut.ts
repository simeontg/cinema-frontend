import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLogout } from 'shared/hooks/authHooks';

import { signOutUser } from '../api';
import { useNavigate } from 'react-router-dom';

export const useSignOutMutation = () => {
    const queryClient = useQueryClient();
    const { onLogout } = useLogout();
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: signOutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onLogout();
            navigate('/');
        }
    });

    return mutation;
};
