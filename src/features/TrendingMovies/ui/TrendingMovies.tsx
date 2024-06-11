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
        <div className="max-w-[1550px] w-full mx-auto h-500 hidden md:block h-[600px] mb-5" style={{boxShadow: 'inset -1px -34px 5px 0px rgba(255,255,255,1)'
        }}>
            <MovieSlider movies={data!} />
        </div>
    );
};
