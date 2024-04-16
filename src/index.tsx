import { createRoot } from 'react-dom/client';
import { App } from './components/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { LazyPage } from './pages/LazyPage';

const root = document.getElementById('root');

if (!root) {
    throw new Error('No root element');
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/lazy',
                element: <Suspense fallback='Loading...'><LazyPage /></Suspense>
            }
        ]
    }
]);

container.render(
    <RouterProvider router={router} />
);