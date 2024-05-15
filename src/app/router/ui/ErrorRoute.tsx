import { type FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useTranslation } from 'shared/hooks/i18nHook';

export const ErrorRoute: FC = () => {
    const { t } = useTranslation('common');
    const error = useRouteError();
    const notFoundPageError = isRouteErrorResponse(error) && error.status === 404;

    return (
        <div>
            {notFoundPageError ? (
                <>
                    <h1>{t('notFoundPageTitle')}</h1>
                    <p>{t('notFoundPageDescription')}</p>
                </>
            ) : (
                <>
                    <h1>{t('errorPageTitle')}</h1>
                    <p>{t('errorPageDescription')}</p>
                </>
            )}
        </div>
    );
};
