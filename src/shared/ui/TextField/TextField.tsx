import { FC, ReactNode } from 'react';

import { InputAdornment, TextField as MaterialTextField } from '@mui/material';

interface TextFieldProps {
    label?: string;
    shrinkLabel?: boolean;
    className?: string;
    required?: boolean;
    icon?: ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    value?: string;
    multiline?: boolean;
    inputPadding?: string;
    type?: string;
    helperText?: ReactNode;
    error?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
    icon,
    label,
    className,
    required,
    onChange,
    onBlur,
    name,
    value,
    type,
    helperText,
    error,
    shrinkLabel,
    multiline,
    inputPadding,
    ...props
}) => {
    return (
        <MaterialTextField
            InputLabelProps={{ shrink: shrinkLabel }}
            InputProps={{
                endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
                sx: {
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        display: 'none'
                    },
                    padding: inputPadding
                }
            }}
            {...props}
            required={required}
            size="small"
            className={className}
            label={label}
            name={name}
            value={value}
            type={type}
            helperText={helperText}
            onChange={onChange}
            onBlur={onBlur}
            multiline={multiline}
            error={error}
        ></MaterialTextField>
    );
};
