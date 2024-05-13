import { createBrowserRouter } from 'react-router-dom';
import { RootRoute } from './ui/RootRoute';
import { ErrorRoute } from './ui/ErrorRoute';
import { MainPageLazy } from 'pages/main';

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
