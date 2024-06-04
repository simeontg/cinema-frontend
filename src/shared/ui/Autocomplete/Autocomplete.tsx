import { AutocompleteRenderInputParams, Autocomplete as MaterialAutocomplete } from "@mui/material";
import { FC, ReactNode } from "react";

type OptionType = {
    label: string;
    value: string | number;
};

interface AutocompleteWrapperProps {
    options: OptionType[];
    onChange: (event: React.SyntheticEvent, value: OptionType | null) => void;
    renderInput: (params?: AutocompleteRenderInputParams) => ReactNode;
    className?: string;
}

export const Autocomplete: FC<AutocompleteWrapperProps> = ({ options, renderInput, className, onChange }) => {
    return (
        <MaterialAutocomplete
            options={options}
            renderInput={renderInput}
            className={className}
            onChange={onChange}
        >
        </MaterialAutocomplete>
    )
}

