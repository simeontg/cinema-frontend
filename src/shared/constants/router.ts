export enum Routes {
    MAIN = 'main',
    LOGIN = 'login',
    PROFILE = 'profile',
    MOVIE = 'movie',
    BOOKSEATS = 'book-seats'
}

export const RoutesPaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.LOGIN]: 'login',
    [Routes.PROFILE]: 'profile',
    [Routes.MOVIE]: 'movie/:id',
    [Routes.BOOKSEATS]: 'book-seats/:id'
};
