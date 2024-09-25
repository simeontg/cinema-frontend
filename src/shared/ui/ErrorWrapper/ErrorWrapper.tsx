import { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'shared/hooks/i18nHook';

interface ErrorWrapperProps {
    isError?: boolean;
    children?: ReactNode;
}

export const ErrorWrapper: FC<ErrorWrapperProps> = ({ isError, children }) => {
    const { t } = useTranslation('common');

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-gray-800">{t('errorPageTitle')}</h1>
                    <p className="text-xl text-gray-600 mt-4">{t('errorPageDescription')}</p>
                    <p className="text-lg text-gray-500 mt-2">
                        {t('returnToThe')}{' '}
                        <Link to="/" className="text-blue-500 hover:underline">
                            {t('homepage')}
                        </Link>
                        .
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
