import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import '../../config/i18n/i18n';
import { router } from './router';
import './styles/index.css';
import theme from './styles/theme';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <div className="app">
                    <RouterProvider router={router} />
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
