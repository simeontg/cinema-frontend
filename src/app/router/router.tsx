import { createBrowserRouter } from 'react-router-dom';

import { MainPageLazy } from 'pages/main';

import { ErrorRoute } from './ui/ErrorRoute';
import { RootRoute } from './ui/RootRoute';
import { AuthPageLazy } from 'pages/auth/AuthPage.async';

export const router = createBrowserRouter([
    {
        path: '',
        element: <RootRoute />,
        errorElement: <ErrorRoute />,
        hasErrorBoundary: false,
        children: [
            {
                path: '/',
                element: <MainPageLazy />
            },
            {
                path: 'login',
                element: <AuthPageLazy />
            }
        ]
    }
]);
