import { FC, ReactNode } from 'react';

import { Alert as MaterialAlert } from '@mui/material';

interface AlertProps {
    children: ReactNode;
    severity?: 'error' | 'success' | 'warning' | 'info';
    className?: string;
}

export const Alert: FC<AlertProps> = ({ children, severity, className }) => {
    return (
        <MaterialAlert className={className} severity={severity}>
            {children}
        </MaterialAlert>
    );
};
