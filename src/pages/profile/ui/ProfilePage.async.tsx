import { type FC, Suspense, lazy } from 'react';

import { ProfilePageSuspense } from './ProfilePage.suspense';

const ProfilePageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "ProfilePage" */ './ProfilePage')
);

export const ProfilePageLazy: FC = () => (
    <Suspense fallback={<ProfilePageSuspense />}>
        <ProfilePageAsync />
    </Suspense>
);
