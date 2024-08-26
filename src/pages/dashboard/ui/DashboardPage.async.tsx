import { type FC, Suspense, lazy } from 'react';
import { DashboardPageSuspense } from './DashboardPage.suspense';

const DashboardPageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "dashboardPage" */ './DashboardPage')
);

export const DashboardPageLazy: FC = () => (
    <Suspense fallback={<DashboardPageSuspense />}>
        <DashboardPageAsync />
    </Suspense>
);
