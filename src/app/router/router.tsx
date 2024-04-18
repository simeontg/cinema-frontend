import { createBrowserRouter } from 'react-router-dom';
import { RootRoute } from './ui/RootRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <div>ERROR</div>,
  }
]);
