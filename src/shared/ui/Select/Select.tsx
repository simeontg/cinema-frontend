import { forwardRef, ReactNode } from 'react';
import { Select as MaterialSelect, SelectChangeEvent } from '@mui/material';

interface SelectProps {
    value?: string;
    onChange: (e: SelectChangeEvent) => void;
    onBlur?: () => void;
    className?: string;
    children: ReactNode;
    label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((
    { value, onBlur, onChange, className, label, children }, ref
) => {
    return (
        <MaterialSelect
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            className={className}
            label={label}
            ref={ref}
        >
            {children}
        </MaterialSelect>
    );
});

Select.displayName = 'Select';