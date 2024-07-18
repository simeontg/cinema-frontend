export enum Routes {
    MAIN = 'main',
    LOGIN = 'login',
    PROFILE = 'profile',
    MOVIE = 'movie'
}

export const RoutesPaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.LOGIN]: 'login',
    [Routes.PROFILE]: 'profile',
    [Routes.MOVIE]: 'movie/:id'
};
