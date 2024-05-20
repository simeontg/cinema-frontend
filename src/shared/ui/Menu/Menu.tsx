import { FC, ReactNode } from 'react';

import MaterialMenu from '@mui/material/Menu';

interface MenuProps {
    open: boolean;
    anchorEl?: HTMLElement | null;
    onClose?: () => void;
    children: ReactNode;
}

export const Menu: FC<MenuProps> = ({ open, anchorEl, onClose, children }) => {
    return (
        <MaterialMenu open={open} anchorEl={anchorEl} onClose={onClose}>
            {children}
        </MaterialMenu>
    );
};
