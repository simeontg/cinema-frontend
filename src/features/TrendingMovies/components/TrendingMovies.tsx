import { movies } from '../mockdata';
import ImageSlider from './ImageSlider';

export const TrendingMovies = () => {
    return (
        <div className="max-w-1200px w-full mx-auto h-500 hidden md:block h-[600px]">
            <ImageSlider movies={movies} />
        </div>
    );
};
