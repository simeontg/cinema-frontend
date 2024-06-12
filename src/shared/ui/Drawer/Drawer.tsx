import { Drawer as MaterialDrawer } from "@mui/material";
import { FC, ReactNode } from "react";

interface DrawerProps {
    children: ReactNode,
    anchor: 'top' | 'left' | 'right' | 'bottom';
    open: boolean;
    onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({ children, open, anchor, onClose }) => {
    return (
        <MaterialDrawer
            anchor={anchor}
            open={open}
            onClose={onClose}
        >
            {children}
        </MaterialDrawer>
    )
}