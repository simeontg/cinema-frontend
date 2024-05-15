import { FC } from 'react';
import { movies } from '../mockdata';
import MovieSlider from './MovieSlider';

export const TrendingMovies: FC = () => {
    return (
        <div className="max-w-1200px w-full mx-auto h-500 hidden md:block h-[600px]">
            <MovieSlider movies={movies} />
        </div>
    );
};
