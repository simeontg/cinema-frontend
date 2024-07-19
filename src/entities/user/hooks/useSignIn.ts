import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLogin } from 'shared/hooks/authHooks';

import { signInUser } from '../api';
import { SigninReqBody } from './types/authTypes';

export const useSignInMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { onLogin } = useLogin();
    const location = useLocation();

    const mutation = useMutation({
        mutationFn: (signInData: SigninReqBody) => {
            return signInUser(signInData);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onLogin(data);
            const { from } = location.state;
            navigate(from);
        }
    });

    return mutation;
};
