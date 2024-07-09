import { FC, ReactNode } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Alert, Button, TextField } from 'shared/ui';

interface ControlRules {
    validate?: (value: string) => boolean | string;
    required?: { value: boolean; message: string };
    minLength?: {
        value: number;
        message: string;
    };
}

interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    rules: ControlRules;
    icon: ReactNode;
    className?: string;
}

interface GenericFormProps {
    onSubmit: SubmitHandler;
    fields: FormFieldProps[];
    wrapperClassName?: string;
    submitButtonLabel: string;
    submitButtonClass?: string;
    submitButtonStyle?: React.CSSProperties;
    isPending?: boolean;
    defaultValues: Record<string, string>;
    formMode: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all' | undefined;
    isError?: boolean;
    introductionText?: string;
    networkErrorMessage?: string;
    formClassName?: string;
    watchControl?: string;
    formError?: string;
}

export const GenericForm: FC<GenericFormProps> = ({
    onSubmit,
    fields,
    wrapperClassName,
    submitButtonLabel,
    submitButtonClass,
    submitButtonStyle,
    defaultValues,
    formMode,
    introductionText,
    isPending,
    formClassName,
    isError,
    networkErrorMessage,
    formError
}) => {
    const { handleSubmit, control } = useForm({
        defaultValues,
        mode: formMode
    });

    return (
        <div className={wrapperClassName}>
            {isError && (
                <Alert className="w-[250px]" severity="error">
                    {networkErrorMessage}
                </Alert>
            )}
            {formError && (
                <Alert className="w-[250px]" severity="error">
                    {formError}
                </Alert>
            )}
            <p className="text-sm">{introductionText}</p>
            <form onSubmit={handleSubmit(onSubmit)} className={formClassName}>
                {fields.map((field) => (
                    <Controller
                        key={field.name}
                        control={control}
                        name={field.name}
                        rules={field.rules}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={field.icon}
                                type={field.type}
                                className={field.className}
                                label={field.label}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                ))}
                <Button
                    className={submitButtonClass}
                    style={submitButtonStyle}
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? 'Loading...' : submitButtonLabel}
                </Button>
            </form>
        </div>
    );
};
