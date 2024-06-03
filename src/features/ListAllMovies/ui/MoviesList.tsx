import { FC } from 'react';

import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';

import { MovieReleaseType } from 'entities/movie/hooks/useGetPaginatedMovies/types';
import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, LoadingSpinner } from 'shared/ui';

import { MovieItem } from './MovieItem';

interface MovieListProp {
    type: MovieReleaseType;
    limit: number;
}

export const MoviesList: FC<MovieListProp> = ({ type, limit }) => {
    const { t } = useTranslation('main');

    const { data, hasNextPage, fetchNextPage, isError, isFetchingNextPage } = useGetPaginatedMovies(
        type,
        limit
    );

    if (isError) {
        return <div>Error loading movies. Please try again later.</div>;
    }

    return (
        <>
            <div className="flex gap-8 flex-wrap mt-5 mb-8 pl-10 max-w-[1400px]">
                {data?.pages.map((page, idx) => (
                    <Fragment key={idx}>
                        {page.items.map((movie) => (
                            <MovieItem
                                key={movie.id}
                                genre={movie.genre}
                                duration={movie.duration}
                                title={movie.title}
                                imageUrl={movie.imageUrl}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div
                className={clsx(
                    'flex items-center justify-center',
                    `${isFetchingNextPage ? 'block' : 'hidden'}`
                )}
            >
                <LoadingSpinner />
            </div>
            <Button
                className="mt-10"
                style={{
                    display: hasNextPage ? 'block' : 'none',
                    margin: 'auto',
                    marginTop: '30px'
                }}
                onClick={() => fetchNextPage()}
                variant="outlined"
            >
                {t('loadMore')}
            </Button>
        </>
    );
};
