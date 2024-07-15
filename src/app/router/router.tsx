import { createBrowserRouter } from 'react-router-dom';

import { AuthPageLazy } from 'pages/auth/AuthPage.async';
import { MainPageLazy } from 'pages/main';
import { Routes, RoutesPaths } from 'shared/constants/router';

import { ErrorRoute } from './ui/ErrorRoute';
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
                path: RoutesPaths[Routes.LOGIN],
                element: <AuthPageLazy />
            }
        ]
    }
]);
