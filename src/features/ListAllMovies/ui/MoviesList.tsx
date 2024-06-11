import { FC, useState } from 'react';

import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';

import { MovieReleaseType } from 'entities/movie/hooks/useGetPaginatedMovies/types';
import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, LoadingSpinner } from 'shared/ui';

import useGetTransformedData from '../hooks/useGetTransformedData';
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

    const { data, hasNextPage, fetchNextPage, isError, isFetchingNextPage } = useGetPaginatedMovies(
        type,
        limit,
        filters
    );

    const [selectedMovie, setSelectedMovie] = useState<SelectedMovie>({
        description: '',
        title: '',
        rowIndex: null,
        genre: '',
        duration: 0,
        imageUrl: '',
        id: ''
    });

    const handleCloseMovieDetails = () => {
        setSelectedMovie({
            description: '',
            title: '',
            rowIndex: null,
            genre: '',
            duration: 0,
            imageUrl: '',
            id: ''
        });
    };

    if (isError) {
        return <div>Error loading movies. Please try again later.</div>;
    }

    const { transformedData } = useGetTransformedData(data);

    let emptyMoviesToAdd = 0;

    if (transformedData?.length) {
        emptyMoviesToAdd = transformedData[0].length - transformedData[transformedData.length - 1].length;
    }

    return (
        <div className="max-w-[1400px] pl-10 pr-10">
            <MovieFilters data={data} setFilters={setFilters} />
            {transformedData?.map((row, idx) => (
                <Fragment key={idx}>
                    <div className="flex gap-8 mt-5">
                        <Fragment>
                            {row.map((movie) => (
                                <MovieItem
                                    key={movie.id}
                                    genre={movie.genre}
                                    duration={movie.duration}
                                    title={movie.title}
                                    imageUrl={movie.imageUrl}
                                    clicked={selectedMovie.id === movie.id}
                                    onClick={() => setSelectedMovie({ ...movie, rowIndex: idx })}
                                />
                            ))}
                            {idx === transformedData.length - 1 &&
                                Array.from({ length: emptyMoviesToAdd }).map((_, idx) => (
                                    <div key={idx} className="w-48 h-48"></div>
                                ))}
                        </Fragment>
                    </div>
                    <MovieDetails
                        isVisible={selectedMovie?.rowIndex === idx}
                        title={selectedMovie?.title}
                        description={selectedMovie?.description}
                        genre={selectedMovie?.genre}
                        imageUrl={selectedMovie?.imageUrl}
                        duration={selectedMovie?.duration}
                        onClose={handleCloseMovieDetails}
                    />
                </Fragment>
            ))}
            <div
                className={clsx(
                    'flex items-center justify-center',
                    `${isFetchingNextPage ? 'block' : 'hidden'}`
                )}
            >
                <LoadingSpinner />
            </div>
            <Button
                style={{
                    display: hasNextPage ? 'block' : 'none',
                    margin: 'auto',
                    marginTop: '30px',
                    padding: '10px 30px',
                    borderRadius: '13px',
                    fontSize: '13px'
                }}
                onClick={() => fetchNextPage()}
                variant="outlined"
            >
                {t('loadMore')}
            </Button>
        </div>
    );
};
