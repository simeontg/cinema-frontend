import { type FC } from 'react';

import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { useTranslation } from 'shared/hooks/i18nHook';

export const ErrorRoute: FC = () => {
    const { t } = useTranslation('common');
    const error = useRouteError();
    const notFoundPageError = isRouteErrorResponse(error) && error.status === 404;

    return (
        <div>
            {notFoundPageError ? (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-9xl font-bold text-gray-800">404</h1>
                        <p className="text-xl text-gray-600 mt-4">
                            {t('notFoundPageTitle')}
                        </p>
                        <p className="text-lg text-gray-500 mt-2">
                            {t('returnToThe')}{' '}
                            <Link to="/" className="text-blue-500 hover:underline">
                                {t('homepage')}
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-9xl font-bold text-gray-800">{t('errorPageTitle')}</h1>
                        <p className="text-xl text-gray-600 mt-4">
                            {t('errorPageDescription')}
                        </p>
                        <p className="text-lg text-gray-500 mt-2">
                            {t('returnToThe')}{' '}
                            <Link to="/" className="text-blue-500 hover:underline">
                                {t('homepage')}
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
