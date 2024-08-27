import { UserRole } from 'entities/user/api/role.enum';
import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { Routes, RoutesPaths } from 'shared/constants/router';
import { useAuthContext } from 'shared/contexts/authContext';

export const AdminRoute = () => {
    const { account } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate(RoutesPaths[Routes.LOGIN], { state: { from: window.location.pathname } });
        } else if (account.role !== UserRole.Admin) {
            navigate(RoutesPaths[Routes.MAIN]);
        }
    }, [account]);

    return account && <Outlet />;
};