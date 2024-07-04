import { FC } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSignIn } from 'entities/user/hooks/useSignIn';
import { useTranslation } from 'shared/hooks/i18nHook';
import { NetworkError } from 'shared/types/network';
import { Alert, Button, TextField } from 'shared/ui';

import { isValidEmail } from './utils/validateEmail';

const buttonStyle = {
    background: 'linear-gradient(135deg, #552879 0%, #311758 25%, #170a3f 100%)'
};

type FormFields = {
    email: string;
    password: string;
};

const LoginForm: FC = () => {
    const { t } = useTranslation('common');

    const { mutate, isPending, isError, error } = useSignIn();

    const { handleSubmit, control } = useForm<FormFields>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
        mutate({ email, password });
    };

    return (
        <div className="flex flex-col gap-4 mt-8 mb-20">
            <p className="text-sm">
                Sign in to your Simeon Cinemas account to see your booking history <br /> and
                profile setting
            </p>
            {isError && (
                <Alert className="w-[250px]" severity="error">
                    {(error as NetworkError).response.data.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: { value: true, message: t('emailRequired') },
                        validate: (value) => isValidEmail(value) || t('enterValidEmail')
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                        return (
                            <TextField
                                icon={<EmailOutlinedIcon />}
                                type="email"
                                className="w-[440px] !rounded-full"
                                label={t('email')}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: { value: true, message: t('passwordRequired') },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextField
                            icon={<KeyIcon />}
                            className="w-[440px]"
                            label={t('password')}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={!!error}
                            value={value}
                            type="password"
                            helperText={error?.message || ''}
                        />
                    )}
                />
                <Button
                    className="!p-6 !w-[180px] !rounded-full !h-[50px] !text-lg !text-white"
                    style={buttonStyle}
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? t('loading') : t('login')}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
