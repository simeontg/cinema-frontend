import { FC } from 'react';

import { useGetTrendedMovies } from 'entities/movie/hooks/useGetTrendedMovies';

import { LoadingSpinner } from 'shared/ui';

import MovieSlider from './MovieSlider';

export const TrendingMovies: FC = () => {
    const { data, isLoading, isError } = useGetTrendedMovies();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <></>;
    }

    return (
        <div className="max-w-1200px w-full mx-auto h-500 hidden md:block h-[600px]">
            <MovieSlider movies={data!} />
        </div>
    );
};
