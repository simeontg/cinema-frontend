import { FC } from 'react';
import MaterialButton, { ButtonProps as MaterialButtonProps } from '@mui/material/Button';

interface ButtonProps extends MaterialButtonProps {}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
    <MaterialButton
        onClick={onClick}
    >
        {children}
    </MaterialButton>
    )
};