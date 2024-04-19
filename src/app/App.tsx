import { RouterProvider } from 'react-router-dom';
import '../../config/i18n/i18n';
import { router } from './router';

export const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
