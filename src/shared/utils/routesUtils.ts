import { Routes } from 'shared/constants/router';

export const generateMovieRoute = (param: string) => {
    return `/${Routes.MOVIE}/${param}`;
};

export const generateBookSeatsRoute = (param: string) => {
    return `/${Routes.BOOKSEATS}/${param}`;
};
