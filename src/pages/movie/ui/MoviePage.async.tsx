import { type FC, Suspense, lazy } from 'react';

import { MoviePageSuspense } from './MoviePage.suspense';

const MoviePageAsync = lazy<FC>(
    async () => await import(/* webpackChunkName: "moviePage" */ './MoviePage')
);

export const MoviePageLazy: FC = () => (
    <Suspense fallback={<MoviePageSuspense />}>
        <MoviePageAsync />
    </Suspense>
);
