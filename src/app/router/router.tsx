import { createBrowserRouter } from 'react-router-dom';
import { RootRoute } from './ui/RootRoute';
import { ErrorRoute } from './ui/ErrorRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorRoute />
  }
]);
