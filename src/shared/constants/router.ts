export enum Routes {
    MAIN = 'main',
    LOGIN = 'login',
    PROFILE = 'profile',
    MOVIE = 'movie',
    BOOKSEATS = 'book-seats',
    DASHBOARD = 'dashboard'
}

export const RoutesPaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.LOGIN]: 'login',
    [Routes.PROFILE]: 'profile',
    [Routes.MOVIE]: 'movie/:id',
    [Routes.BOOKSEATS]: 'book-seats/:id',
    [Routes.DASHBOARD]: 'dashboard'
};
