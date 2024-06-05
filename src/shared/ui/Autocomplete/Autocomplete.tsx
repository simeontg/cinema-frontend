import { FC, ReactNode } from 'react';

import { AutocompleteRenderInputParams, Autocomplete as MaterialAutocomplete } from '@mui/material';

interface AutocompleteWrapperProps {
    options: string[];
    onChange?: (event: React.SyntheticEvent, value: string | null) => void;
    renderInput: (params?: AutocompleteRenderInputParams) => ReactNode;
    className?: string;
}

export const Autocomplete: FC<AutocompleteWrapperProps> = ({
    options,
    renderInput,
    className,
    onChange
}) => {
    return (
        <MaterialAutocomplete
            options={options}
            renderInput={renderInput}
            className={className}
            onChange={onChange}
        ></MaterialAutocomplete>
    );
};
