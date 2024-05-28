import { FC, MouseEventHandler, ReactNode } from 'react';

import MaterialButton from '@mui/material/Button';

interface ButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?: 'outlined' | 'contained' | 'text';
}

export const Button: FC<ButtonProps> = ({ children, onClick, disabled, className, variant }) => {
    return (
        <MaterialButton
            variant={variant}
            style={{ display: 'block', margin: 'auto' }}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </MaterialButton>
    );
};
