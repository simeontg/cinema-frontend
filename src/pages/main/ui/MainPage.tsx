import { FC } from 'react';

import { MovieList } from 'features/ListAllMovies';
import { TrendingMovies } from 'features/TrendingMovies';

const MainPage: FC = () => {
    return (
        <>
            <TrendingMovies />
            <MovieList />
        </>
    );
};

export default MainPage;
