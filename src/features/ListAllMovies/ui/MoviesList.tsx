import { FC, useState } from 'react';

import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';

import { MovieReleaseType } from 'entities/movie/hooks/useGetPaginatedMovies/types';
import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, LoadingSpinner } from 'shared/ui';
import { splitToRows } from 'shared/utils/splitToRows';

import { Filters, SelectedMovie } from '../types';
import { MovieDetails } from './MovieDetails';
import { MovieFilters } from './MovieFilters';
import { MovieItem } from './MovieItem';

interface MovieListProp {
    type: MovieReleaseType;
    limit: number;
}

export const MoviesList: FC<MovieListProp> = ({ type, limit }) => {
    const { t } = useTranslation('main');

    const [filters, setFilters] = useState<Filters>({
        title: '',
        genre: ''
    });

    const [selectedMovie, setSelectedMovie] = useState<SelectedMovie>({
        description: '',
        title: '',
        rowIndex: null,
        genre: '',
        duration: 0,
        imageUrl: ''
    });

    const { data, hasNextPage, fetchNextPage, isError, isFetchingNextPage } = useGetPaginatedMovies(
        type,
        limit,
        filters
    );

    if (isError) {
        return <div>Error loading movies. Please try again later.</div>;
    }

    const items = data?.pages.flatMap((page) => splitToRows(page.items, 6));

    return (
        <>
            <MovieFilters data={data} setFilters={setFilters} />
            <div className="flex gap-8 flex-wrap mt-5 pl-10 max-w-[1400px]">
                {items?.map((page, idx) => (
                    <Fragment key={idx}>
                        {page.map((movie) => (
                            <MovieItem
                                key={movie.id}
                                genre={movie.genre}
                                duration={movie.duration}
                                title={movie.title}
                                imageUrl={movie.imageUrl}
                                description={movie.description}
                                rowIndex={idx}
                                setSelectedMovie={setSelectedMovie}
                            />
                        ))}
                        <MovieDetails
                            isVisible={selectedMovie?.rowIndex === idx}
                            title={selectedMovie?.title}
                            description={selectedMovie?.description}
                            genre={selectedMovie?.genre}
                            imageUrl={selectedMovie?.imageUrl}
                            duration={selectedMovie?.duration}
                            setSelectedMovie={setSelectedMovie}
                        />
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
