import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../config/i18n/i18n';
import { router } from './router';
import './styles/index.css';
import Header from '../layout/Header';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <Header />
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
};
