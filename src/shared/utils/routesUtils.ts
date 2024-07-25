import { Routes } from 'shared/constants/router';

export const generateMovieRoute = (param: string) => {
    return `${Routes.MOVIE}/${param}`;
};
