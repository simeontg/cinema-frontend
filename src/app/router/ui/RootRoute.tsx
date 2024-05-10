import { Outlet } from 'react-router-dom';
import { TrendingMovies } from '../../../features/TrendingMovies';

export const RootRoute = () => {
    return (
        <>
            <TrendingMovies />
            <Outlet />
        </>
    );
};
