import { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';

import MaterialButton from '@mui/material/Button';

interface ButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?: 'outlined' | 'contained' | 'text';
    style?: CSSProperties;
    type?: 'submit';
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
    className,
    variant,
    style,
    type
}) => {
    return (
        <MaterialButton
            variant={variant}
            className={className}
            disabled={disabled}
            onClick={onClick}
            type={type}
            style={style}
        >
            {children}
        </MaterialButton>
    );
};
