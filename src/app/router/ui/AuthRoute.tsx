import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { Routes, RoutesPaths } from 'shared/constants/router';
import { useAuthContext } from 'shared/contexts/authContext';

export const AuthRoute = () => {
    const { account } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (account) {
            navigate(RoutesPaths[Routes.MAIN]);
        }
    }, [account]);

    return !account && <Outlet />;
};
