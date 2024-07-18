import { createBrowserRouter } from 'react-router-dom';

import { AuthPageLazy } from 'pages/auth/AuthPage.async';
import { MainPageLazy } from 'pages/main';
import { ProfilePageLazy } from 'pages/profile';
import { Routes, RoutesPaths } from 'shared/constants/router';

import { ErrorRoute } from './ui/ErrorRoute';
import { ProtectedRoute } from './ui/ProtectedRoute';
import { AuthRoute } from './ui/AuthRoute';
import { RootRoute } from './ui/RootRoute';
import { PublicRoute } from './ui/PublicRoute';
import { MoviePageLazy } from 'pages/movie';

export const router = createBrowserRouter([
    {
        path: '',
        element: <RootRoute />,
        errorElement: <ErrorRoute />,
        hasErrorBoundary: false,
        children: [
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: RoutesPaths[Routes.MAIN],
                        element: <MainPageLazy />
                    }
                ]
            },
            {
                element: <AuthRoute />,
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
                    },
                    {
                        path: RoutesPaths[Routes.MOVIE],
                        element: <MoviePageLazy />
                    }
                ]
            }
        ]
    }
]);
