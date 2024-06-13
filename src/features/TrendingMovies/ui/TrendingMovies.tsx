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
        <div className="max-w-[1550px] w-full mx-auto h-500 hidden md:block h-[600px] mb-5">
            <MovieSlider movies={data!} />
        </div>
    );
};
