import { FC, ReactNode } from 'react';

import MaterialMenuItem from '@mui/material/MenuItem';

interface MenuItemProps {
    onClick?: () => void;
    value?: string;
    children: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({ children, onClick, value }) => {
    return (
        <MaterialMenuItem value={value} onClick={onClick}>
            {children}
        </MaterialMenuItem>
    );
};
