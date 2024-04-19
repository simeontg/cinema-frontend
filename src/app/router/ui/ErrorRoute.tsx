import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorRoute: FC = () => {
  const { t } = useTranslation();
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
