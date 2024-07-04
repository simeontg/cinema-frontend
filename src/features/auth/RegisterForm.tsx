import { FC } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GestureOutlinedIcon from '@mui/icons-material/GestureOutlined';
import KeyIcon from '@mui/icons-material/Key';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSignUp } from 'entities/user/hooks/useSignUp';
import { useTranslation } from 'shared/hooks/i18nHook';
import { NetworkError } from 'shared/types/network';
import { Alert, Button, TextField } from 'shared/ui';

import { isValidEmail } from './utils/validateEmail';

const buttonStyle = {
    background: 'linear-gradient(135deg, #552879 0%, #311758 25%, #170a3f 100%)'
};

type FormFields = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm: FC = () => {
    const { t } = useTranslation('common');

    const { mutate, isPending, isError, error } = useSignUp();

    const { control, handleSubmit, watch } = useForm<FormFields>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onBlur'
    });

    const password = watch('password');

    const onSubmit: SubmitHandler<FormFields> = async ({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
    }) => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        mutate({ email, password, firstName, lastName, phoneNumber });
    };

    return (
        <div className="flex flex-col gap-4 mt-6 mb-2">
            <p className="text-sm">
                Create a Simeon Cinemas account to make booking movies easier and <br /> to see your
                booking history.
            </p>
            {isError && (
                <Alert className="w-[250px]" severity="error">
                    {(error as NetworkError).response.data.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-4">
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: { value: true, message: t('firstNameRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<GestureOutlinedIcon />}
                                className="w-1/3"
                                label={t('firstName')}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: { value: true, message: t('lastNameRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<GestureOutlinedIcon />}
                                onChange={onChange}
                                className="w-1/3"
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                                label={t('lastName')}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: { value: true, message: t('emailRequired') },
                            validate: (value) => isValidEmail(value) || t('enterValidEmail')
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<EmailOutlinedIcon />}
                                onChange={onChange}
                                className="w-1/3"
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                                label={t('email')}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{
                            required: { value: true, message: t('phoneNumberRequired') },
                            validate: (value) =>
                                value.length === 10 || t('phoneDigitsError')
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<PhoneOutlinedIcon />}
                                onChange={onChange}
                                className="w-1/3"
                                onBlur={onBlur}
                                error={!!error}
                                type="number"
                                value={value}
                                helperText={error?.message || ''}
                                label={t('phoneNumber')}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: { value: true, message: t('passwordRequired') },
                            minLength: {
                                value: 8,
                                message: t('passwordLengthError')
                            }
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<KeyIcon />}
                                onChange={onChange}
                                className="w-1/3"
                                onBlur={onBlur}
                                error={!!error}
                                type="password"
                                value={value}
                                helperText={error?.message || ''}
                                label={t('password')}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: { value: true, message: t('passwordRequired') },
                            validate: (value) => value === password || t('passwordsDoNotMatch')
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                icon={<KeyIcon />}
                                onChange={onChange}
                                className="w-1/3"
                                onBlur={onBlur}
                                error={!!error}
                                type="password"
                                value={value}
                                helperText={error?.message || ''}
                                label={t('confirmPassword')}
                            />
                        )}
                    />
                </div>
                <Button
                    className="!p-6 !w-[220px] !mt-4 !rounded-full !h-[50px] !text-white !text-lg"
                    style={buttonStyle}
                    type="submit"
                >
                    {isPending ? t('loading') : t('signup')}
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;
