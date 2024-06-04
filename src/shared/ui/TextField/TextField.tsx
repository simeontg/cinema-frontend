import { TextField as MaterialTextField } from "@mui/material";
import { FC } from "react";

interface TextFieldProps {
    label: string;
}

export const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
    return (
        <MaterialTextField
            {...props}
            label={label}
        >

        </MaterialTextField>
    )
}