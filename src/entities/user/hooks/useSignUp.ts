import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { signUpUser } from '../api';
import { SignupReqBody } from './types/authTypes';

export const useSignUp = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (signUpData: SignupReqBody) => {
            return signUpUser(signUpData);
        },
        onSuccess: () => {
            navigate('/login');
        }
    });

    return mutation;
};
