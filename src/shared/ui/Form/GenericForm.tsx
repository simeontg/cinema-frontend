import { FC, ReactNode, useEffect } from 'react';

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
    resetForm?: boolean;
    formError?: string;
}

export const GenericForm: FC<GenericFormProps> = ({
    onSubmit,
    fields,
    wrapperClassName,
    submitButtonLabel,
    resetForm,
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
    const { handleSubmit, control, reset } = useForm({
        defaultValues,
        mode: formMode
    });

    useEffect(() => {
        reset();
    }, [resetForm]);

    return (
        <div className={wrapperClassName}>
            {isError && (
                <Alert className="max-w-96 !m-auto md:!m-0" severity="error">
                    {networkErrorMessage}
                </Alert>
            )}
            {formError && (
                <Alert className="max-w-96 !m-auto md:!m-0" severity="error">
                    {formError}
                </Alert>
            )}
            <p className="text-sm text-center md:text-start">{introductionText}</p>
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
