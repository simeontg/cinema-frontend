import { createBrowserRouter } from 'react-router-dom';

import { AuthPageLazy } from 'pages/auth/AuthPage.async';
import { MainPageLazy } from 'pages/main';
import { ProfilePageLazy } from 'pages/profile';
import { Routes, RoutesPaths } from 'shared/constants/router';

import { ErrorRoute } from './ui/ErrorRoute';
import { ProtectedRoute } from './ui/ProtectedRoute';
import { PublicRoute } from './ui/PublicRoute';
import { RootRoute } from './ui/RootRoute';

export const router = createBrowserRouter([
    {
        path: '',
        element: <RootRoute />,
        errorElement: <ErrorRoute />,
        hasErrorBoundary: false,
        children: [
            {
                path: RoutesPaths[Routes.MAIN],
                element: <MainPageLazy />
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: RoutesPaths[Routes.LOGIN],
                        element: <AuthPageLazy />
                    }
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: RoutesPaths[Routes.PROFILE],
                        element: <ProfilePageLazy />
                    }
                ]
            }
        ]
    }
]);
