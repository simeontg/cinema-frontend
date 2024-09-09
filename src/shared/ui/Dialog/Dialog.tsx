import { FC, ReactNode } from 'react';

import { Dialog as MaterialDialog } from '@mui/material';

interface DialogProps {
    open: boolean;
    children: ReactNode;
    fullScreen?: boolean;
    className?: string;
    onClose?: () => void;
    afterClose?: () => void;
}

export const Dialog: FC<DialogProps> = ({
    open,
    children,
    className,
    onClose,
    fullScreen,
    afterClose
}) => {
    return (
        <MaterialDialog
            TransitionProps={{ onExited: afterClose }}
            fullScreen={fullScreen}
            className={className}
            onClose={onClose}
            open={open}
        >
            {children}
        </MaterialDialog>
    );
};
