import { createBrowserRouter } from 'react-router-dom';

import { MainPageLazy } from 'pages/main';

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
                path: '/',
                element: <MainPageLazy />
            }
        ]
    }
]);
