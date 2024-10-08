import { createBrowserRouter } from 'react-router-dom';

import { AuthPageLazy } from 'pages/auth/AuthPage.async';
import { BookSeatsPageLazy } from 'pages/book';
import { DashboardPageLazy } from 'pages/dashboard';
import { MainPageLazy } from 'pages/main';
import { MoviePageLazy } from 'pages/movie';
import { ProfilePageLazy } from 'pages/profile';
import { Routes, RoutesPaths } from 'shared/constants/router';

import { AdminRoute } from './ui/AdminRoute';
import { AuthRoute } from './ui/AuthRoute';
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
                    },
                    {
                        path: RoutesPaths[Routes.BOOKSEATS],
                        element: <BookSeatsPageLazy />
                    }
                ]
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: RoutesPaths[Routes.DASHBOARD],
                        element: <DashboardPageLazy />
                    }
                ]
            }
        ]
    }
]);
