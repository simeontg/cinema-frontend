export enum Routes {
    MAIN = 'main',
    LOGIN = 'login',
    PROFILE = 'profile'
}

export const RoutesPaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.LOGIN]: 'login',
    [Routes.PROFILE]: 'profile'
};
