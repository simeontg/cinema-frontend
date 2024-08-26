import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { Routes, RoutesPaths } from 'shared/constants/router';
import { useAuthContext } from 'shared/contexts/authContext';

export const AdminRoute = () => {
    const { account } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!account || account.role !== 'ADMIN') {
            navigate(RoutesPaths[Routes.LOGIN], { state: { from: window.location.pathname } });
        }
    }, [account]);

    return account && <Outlet />;
};