import { FC } from 'react';

import { Checkbox as MaterialCheckbox } from '@mui/material';

interface CheckboxProps {
    checked: boolean | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
    return <MaterialCheckbox checked={checked} onChange={onChange}></MaterialCheckbox>;
};
