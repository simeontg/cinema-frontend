import { FC } from 'react';

import { useGetTrendedMovies } from 'entities/movie/hooks/useGetTrendedMovies';
import { ErrorWrapper } from 'shared/ui';

import MovieSlider from './MovieSlider';
import { TrendingMoviesSkeleton } from './skeleton/TrendingMovieSkeleton';

export const TrendingMovies: FC = () => {
    const { data: trendedMovies, isLoading, isError } = useGetTrendedMovies();

    if (isLoading) {
        return <TrendingMoviesSkeleton />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="max-w-[1550px] w-full mx-auto h-500 hidden md:block h-[600px] mb-5">
                <MovieSlider movies={trendedMovies.slice(0,6)} />
            </div>
        </ErrorWrapper>
    );
};
