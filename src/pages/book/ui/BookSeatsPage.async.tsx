import { type FC, Suspense, lazy } from 'react';

import { BookSeatsPageSuspense } from './BookSeatsPage.suspense';

const BookSeatsPageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "BookSeatsPage" */ './BookSeatsPage')
);

export const BookSeatsPageLazy: FC = () => (
    <Suspense fallback={<BookSeatsPageSuspense />}>
        <BookSeatsPageAsync />
    </Suspense>
);
