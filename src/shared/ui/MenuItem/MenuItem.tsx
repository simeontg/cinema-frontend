import MaterialMenuItem from '@mui/material/MenuItem';
import { FC, ReactNode } from 'react';

interface MenuItemProps {
    onClick?: () => void;
    children: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({ children, onClick }) => {
    return <MaterialMenuItem onClick={onClick}>{children}</MaterialMenuItem>;
};
