import { Dispatch, FC, SetStateAction, useState } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GestureOutlinedIcon from '@mui/icons-material/GestureOutlined';
import KeyIcon from '@mui/icons-material/Key';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { SubmitHandler } from 'react-hook-form';

import { useSignUpMutation } from 'entities/user/hooks/useSignUp';
import { useTranslation } from 'shared/hooks/i18nHook';
import { NetworkError } from 'shared/types/network';
import { GenericForm } from 'shared/ui';

import { isValidEmail } from '../utils/validateEmail';

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

const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
};

interface RegisterFormProps {
    setTabValue: Dispatch<SetStateAction<number>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({ setTabValue }) => {
    const { t } = useTranslation('common');

    const { mutate: signUp, isPending, isError, error } = useSignUpMutation();

    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

    const [resetForm, setResetForm] = useState(false);

    const onSubmit: SubmitHandler<FormFields> = async ({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
    }) => {
        if (password !== confirmPassword) {
            setIsPasswordMismatch(true);
        } else {
            setIsPasswordMismatch(false);
            signUp({ email, password, firstName, lastName, phoneNumber });
            setResetForm(true);
            setTabValue(0);
        }
    };

    const fields = [
        {
            name: 'firstName',
            label: t('firstName'),
            type: 'text',
            icon: <GestureOutlinedIcon />,
            rules: {
                required: { value: true, message: t('firstNameRequired') }
            },
            className: 'w-full md:w-1/3'
        },
        {
            name: 'lastName',
            label: t('lastName'),
            type: 'text',
            icon: <GestureOutlinedIcon />,
            rules: {
                required: { value: true, message: t('lastNameRequired') }
            },
            className: 'w-full md:w-1/3'
        },
        {
            name: 'email',
            label: t('email'),
            type: 'email',
            icon: <EmailOutlinedIcon />,
            rules: {
                validate: (value: string) => isValidEmail(value) || t('enterValidEmail'),
                required: { value: true, message: t('emailRequired') }
            },
            className: 'w-full md:w-1/3'
        },
        {
            name: 'phoneNumber',
            label: t('phoneNumber'),
            type: 'number',
            icon: <PhoneOutlinedIcon />,
            rules: {
                validate: (value: string) => value.length === 10 || t('phoneDigitsError'),
                required: { value: true, message: t('phoneNumberRequired') }
            },
            className: 'w-full md:w-1/3'
        },
        {
            name: 'password',
            label: t('password'),
            type: 'password',
            icon: <KeyIcon />,
            rules: {
                minLength: {
                    value: 8,
                    message: t('passwordLengthError')
                },
                required: { value: true, message: t('passwordRequired') }
            },
            className: 'w-full md:w-1/3'
        },
        {
            name: 'confirmPassword',
            label: t('confirmPassword'),
            type: 'password',
            icon: <KeyIcon />,
            rules: {
                required: { value: true, message: t('passwordRequired') }
            },
            className: 'w-full md:w-1/3'
        }
    ];

    return (
        <GenericForm
            onSubmit={onSubmit}
            fields={fields}
            formClassName="flex items-center flex-col md:flex-row md:flex-wrap gap-4"
            wrapperClassName="flex flex-col gap-4 mt-8 mb-20"
            submitButtonLabel={t('signup')}
            submitButtonClass="!p-6 !w-[360px] !rounded-full !h-[50px] !text-lg !text-white"
            submitButtonStyle={buttonStyle}
            isPending={isPending}
            formMode="onBlur"
            defaultValues={defaultValues}
            resetForm={resetForm}
            watchControl="password"
            isError={isError}
            formError={isPasswordMismatch ? 'Passwords must match' : ''}
            introductionText={t('registerFormIntroText')}
            networkErrorMessage={(error as NetworkError)?.response?.data?.message}
        />
    );
};
