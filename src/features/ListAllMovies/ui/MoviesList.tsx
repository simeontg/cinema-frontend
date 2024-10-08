import { FC, useEffect, useState } from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { MovieReleaseType } from 'entities/movie/hooks/useGetPaginatedMovies/types';
import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Button, ErrorWrapper, LoadingSpinner } from 'shared/ui';
import { generateMovieRoute } from 'shared/utils/routesUtils';

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
    const { t } = useTranslation('common');

    const [filters, setFilters] = useState<Filters>({
        title: '',
        genre: ''
    });

    const {
        data: movies,
        hasNextPage,
        fetchNextPage,
        isError,
        isFetchingNextPage,
        isLoading
    } = useGetPaginatedMovies(type, limit, filters);

    const [selectedMovie, setSelectedMovie] = useState<SelectedMovie>({
        description: '',
        title: '',
        rowIndex: null,
        genre: '',
        duration: 0,
        imageUrl: '',
        id: '',
        hasSessions: false
    });

    useEffect(() => {
        setSelectedMovie({
            description: '',
            title: '',
            rowIndex: null,
            genre: '',
            duration: 0,
            imageUrl: '',
            id: '',
            hasSessions: false
        });
    }, [filters]);

    const handleCloseMovieDetails = () => {
        setSelectedMovie({
            description: '',
            title: '',
            rowIndex: null,
            genre: '',
            duration: 0,
            imageUrl: '',
            id: '',
            hasSessions: false
        });
    };

    const screenSize = useScreenSize();
    const navigate = useNavigate();

    const transformedData = useGetTransformedData(movies);

    let emptyMoviesToAdd = 0;

    if (transformedData?.length) {
        emptyMoviesToAdd =
            transformedData[0].length - transformedData[transformedData.length - 1].length;
    }

    if (!transformedData && isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="max-w-[1400px] pl-10 pr-10">
                <MovieFilters type={type} setFilters={setFilters} />
                {transformedData && transformedData.length === 0 && !isLoading ? (
                    <p className="text-center font-effra py-20 text-xl">
                        {t('noMoviesMatchingCriteria')}
                    </p>
                ) : (
                    transformedData?.map((row, idx) => (
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
                                            onClick={() => {
                                                if (screenSize.width < MOBILE_SCREEN_WIDTH) {
                                                    navigate(generateMovieRoute(movie.id));
                                                } else {
                                                    setSelectedMovie({ ...movie, rowIndex: idx });
                                                }
                                            }}
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
                                showBookNow={!!selectedMovie.sessions?.some(
                                    (s) =>
                                        new Date(`${s.date}T${s.startTime}`).getTime() >
                                        new Date().getTime()
                                )}
                                description={selectedMovie?.description}
                                genre={selectedMovie?.genre}
                                id={selectedMovie?.id}
                                imageUrl={selectedMovie?.imageUrl}
                                duration={selectedMovie?.duration}
                                onClose={handleCloseMovieDetails}
                            />
                        </Fragment>
                    ))
                )}
                <div
                    className={clsx(
                        'flex items-center justify-center',
                        `${isFetchingNextPage ? 'block' : 'hidden'}`
                    )}
                >
                    <LoadingSpinner />
                </div>
                <Button
                    className={clsx(
                        'hover:!bg-[#6e3996] hover:!text-white hover:!border-[#6e3996] !rounded-[13px] !px-8 !py-2.5 !m-auto !mt-8 text-[13px]',
                        hasNextPage ? '!block' : '!hidden'
                    )}
                    onClick={() => fetchNextPage()}
                    variant="outlined"
                >
                    {t('loadMore')}
                </Button>
            </div>
        </ErrorWrapper>
    );
};
