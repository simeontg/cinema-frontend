import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieSlider from './MovieSlider';
import { LoadingSpinner } from 'shared/ui';
import { getTrendingMovies } from 'entities/movie/api';
import { TrendingMovie } from 'entities/movie/model/types';

export const TrendingMovies: FC = () => {
    const { data, isLoading, error } = useQuery<TrendingMovie[]>({ queryKey: ['trending'], queryFn: () => getTrendingMovies()});

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <>{error.message}</>
    }
    
    return (
        <div className="max-w-1200px w-full mx-auto h-500 hidden md:block h-[600px]">
            <MovieSlider movies={data!} />
        </div>
    );
};
