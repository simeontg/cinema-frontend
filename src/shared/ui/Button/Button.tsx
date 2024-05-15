import { FC, MouseEventHandler, ReactNode } from 'react';
import MaterialButton from '@mui/material/Button';

interface ButtonProps {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
    return <MaterialButton disabled={disabled} onClick={onClick}>{children}</MaterialButton>;
};
