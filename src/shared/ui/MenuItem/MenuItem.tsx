import { FC, ReactNode } from 'react';

import MaterialMenuItem from '@mui/material/MenuItem';

interface MenuItemProps {
    onClick?: () => void;
    children: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({ children, onClick }) => {
    return <MaterialMenuItem onClick={onClick}>{children}</MaterialMenuItem>;
};
