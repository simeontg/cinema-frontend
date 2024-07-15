import { useCallback } from 'react';

import { USER_LOCALSTORAGE_KEY } from 'shared/constants/storage';
import { useAuthContext } from 'shared/contexts/authContext';
import storageService from 'shared/services/storageService';
import { BaseAccount } from 'shared/types/auth';

export const useLogin = () => {
    const { setAccount, setAuth } = useAuthContext();

    const onLogin = useCallback(
        (data: BaseAccount) => {
            storageService.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
            setAccount(data);
            setAuth(true);
        },
        [setAccount, setAuth]
    );

    return { onLogin };
};

export const useLogout = () => {
    const { setAccount, setAuth } = useAuthContext();

    const onLogout = useCallback(() => {
        storageService.removeItem(USER_LOCALSTORAGE_KEY);

        setAuth(false);
        setAccount(null);
    }, [setAuth, setAccount]);

    return {
        onLogout
    };
};
