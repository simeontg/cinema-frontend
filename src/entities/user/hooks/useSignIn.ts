import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLogin } from 'shared/hooks/authHooks';

import { signInUser } from '../api';
import { SigninReqBody } from './types/authTypes';

export const useSignInMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { onLogin } = useLogin();

    const mutation = useMutation({
        mutationFn: (signInData: SigninReqBody) => {
            return signInUser(signInData);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onLogin(data);
            navigate('/');
        }
    });

    return mutation;
};
