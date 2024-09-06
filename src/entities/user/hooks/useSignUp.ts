import { useMutation } from '@tanstack/react-query';

import { signUpUser } from '../api';
import { SignupReqBody } from './types/authTypes';

export const useSignUpMutation = () => {
    const mutation = useMutation({
        mutationFn: (signUpData: SignupReqBody) => {
            return signUpUser(signUpData);
        }
    });

    return mutation;
};
