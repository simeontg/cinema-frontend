import { type FC, Suspense, lazy } from 'react';

import { AuthPageSuspense } from './AuthPage.suspense';

const AuthPageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "authPage" */ './AuthPage')
);

export const AuthPageLazy: FC = () => (
    <Suspense fallback={<AuthPageSuspense />}>
        <AuthPageAsync />
    </Suspense>
);
