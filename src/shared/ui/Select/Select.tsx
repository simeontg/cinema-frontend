import { FC, ReactNode } from 'react';

import { Select as MaterialSelect } from '@mui/material';

interface SelectProps {
    value?: string;
    onChange: () => void;
    onBlur: () => void;
    className?: string;
    children: ReactNode;
    label?: string;
}

export const Select: FC<SelectProps> = ({
    value,
    onBlur,
    onChange,
    className,
    label,
    children
}) => {
    return (
        <MaterialSelect
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            className={className}
            label={label}
        >
            {children}
        </MaterialSelect>
    );
};
