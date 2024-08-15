import { FC, ReactNode } from 'react';

import { Dialog as MaterialDialog } from '@mui/material';

interface DialogProps {
    open: boolean;
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}

export const Dialog: FC<DialogProps> = ({ open, children, className, onClose }) => {
    return <MaterialDialog className={className} onClose={onClose} open={open}>{children}</MaterialDialog>;
};
