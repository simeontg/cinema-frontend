import { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';

import MaterialButton from '@mui/material/Button';

interface ButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?: 'outlined' | 'contained' | 'text';
    style?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
    className,
    variant,
    style
}) => {
    return (
        <MaterialButton
            variant={variant}
            className={className}
            disabled={disabled}
            onClick={onClick}
            style={style}
            sx={{'&:hover': {backgroundColor: '#6e3996', color: 'white', borderColor: '#6e3996'}}}
        >
            {children}
        </MaterialButton>
    );
};
