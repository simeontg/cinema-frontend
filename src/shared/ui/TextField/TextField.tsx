import { FC } from 'react';

import { TextField as MaterialTextField } from '@mui/material';

interface TextFieldProps {
    label: string;
}

export const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
    return <MaterialTextField {...props} label={label}></MaterialTextField>;
};
