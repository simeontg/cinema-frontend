import { $authApi } from 'shared/api/api';

import { SigninReqBody, SignupReqBody } from '../hooks/types/authTypes';
import { GetUserDTO } from './types';

export const signUpUser = async (signUpData: SignupReqBody) => {
    const response = await $authApi.post('/auth/register', signUpData);
    return response.data;
};

export const signInUser = async (signInData: SigninReqBody): Promise<GetUserDTO> => {
    const response = await $authApi.post('/auth/login', signInData);
    return response.data;
};

export const getUser = async (): Promise<GetUserDTO> => {
    const response = await $authApi.get('/users');
    return response.data;
};
