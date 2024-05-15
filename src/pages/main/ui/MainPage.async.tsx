import { type FC, Suspense, lazy } from 'react';

import { MainPageSuspense } from './MainPage.suspense';

const MainPageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "mainPage" */ './MainPage')
);

export const MainPageLazy: FC = () => (
    <Suspense fallback={<MainPageSuspense />}>
        <MainPageAsync />
    </Suspense>
);