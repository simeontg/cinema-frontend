import { FC } from 'react';

import { TrendingMovies } from 'features/TrendingMovies';
import { MovieList } from 'features/ListAllMovies';

const MainPage: FC = () => {
    return (
        <>
            <TrendingMovies />
            <MovieList />
        </>
    );
};

export default MainPage;
