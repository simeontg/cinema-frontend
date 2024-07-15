import React, { createContext, useContext, useEffect, useState } from 'react';

import { $authApi } from 'shared/api/api';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/storage';
import storageService from 'shared/services/storageService';

import { type BaseAccount } from '../types/auth';

interface IAuthContext {
    account: BaseAccount | null;
    auth: boolean | null;
    setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
    setAccount: React.Dispatch<React.SetStateAction<BaseAccount | null>>;
}

const authContextDefaultState: IAuthContext = {
    account: null,
    auth: null,
    setAuth: () => null,
    setAccount: () => null
};

export const AuthContext = createContext<IAuthContext>(authContextDefaultState);
export const useAuthContext = (): IAuthContext => {
    return useContext(AuthContext);
};

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const user = storageService.getItem(USER_LOCALSTORAGE_KEY);
    const [accountState, setAccountState] = useState<BaseAccount | null>(
        user ? JSON.parse(user) : null
    );
    const [authState, setAuthState] = useState<boolean | null>(null);

    useEffect(() => {
        const checkUserStatus = async () => {
            if (!accountState) {
                try {
                    const response = await $authApi.get('/users');
                    const userData = response.data;
                    setAccountState(userData);
                    setAuthState(true);
                    storageService.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
                } catch (error) {
                    setAuthState(false);
                }
            } else {
                setAuthState(true);
            }
        };

        checkUserStatus();
    }, []);

    const value = {
        account: accountState,
        setAccount: setAccountState,
        auth: authState,
        setAuth: setAuthState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
