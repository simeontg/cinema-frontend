import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { signInUser } from '../api';
import { SigninReqBody } from './types/authTypes';

export const useSignIn = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (signInData: SigninReqBody) => {
            return signInUser(signInData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        }
    });

    return mutation;
};
