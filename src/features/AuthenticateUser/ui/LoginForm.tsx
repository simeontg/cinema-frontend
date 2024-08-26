import { FC } from 'react';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { SubmitHandler } from 'react-hook-form';

import { useSignInMutation } from 'entities/user/hooks/useSignIn';
import { useTranslation } from 'shared/hooks/i18nHook';
import { NetworkError } from 'shared/types/network';
import { GenericForm } from 'shared/ui';

import { isValidEmail } from '../utils/validateEmail';

const buttonStyle = {
    background: 'linear-gradient(135deg, #552879 0%, #311758 25%, #170a3f 100%)'
};

type FormFields = {
    email: string;
    password: string;
};

const defaultValues = {
    email: '',
    password: ''
};

export const LoginForm: FC = () => {
    const { t } = useTranslation('common');

    const { mutate: signIn, isPending, isError, error } = useSignInMutation();

    const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
        signIn({ email, password });
    };

    const fields = [
        {
            name: 'email',
            label: t('email'),
            type: 'email',
            icon: <EmailOutlinedIcon />,
            rules: {
                validate: (value: string) => isValidEmail(value) || t('enterValidEmail'),
                required: { value: true, message: t('emailRequired') }
            },
            className: 'max-w-[440px]'
        },
        {
            name: 'password',
            label: t('password'),
            type: 'password',
            icon: <KeyIcon />,
            rules: {
                required: { value: true, message: t('passwordRequired') }
            },
            className: 'max-w-[440px]'
        }
    ];

    return (
        <GenericForm
            onSubmit={onSubmit}
            fields={fields}
            wrapperClassName="flex flex-col gap-4 mt-8 mb-20 items-center md:items-start"
            submitButtonLabel={t('login')}
            submitButtonClass="!p-6 !w-[180px] !rounded-full !h-[50px] !text-lg !text-white"
            submitButtonStyle={buttonStyle}
            isPending={isPending}
            formMode="onBlur"
            defaultValues={defaultValues}
            isError={isError}
            formClassName="flex flex-col gap-4 justify-center items-center md:justify-start md:items-start"
            introductionText={t('loginFormIntroText')}
            networkErrorMessage={(error as NetworkError)?.response?.data?.message}
        />
    );
};
