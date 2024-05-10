import MaterialButton, { ButtonProps as MaterialButtonProps } from '@mui/material/Button';

interface ButtonProps extends MaterialButtonProps {}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <MaterialButton {...props}>
            {children}
        </MaterialButton>
    )
}

export default Button;