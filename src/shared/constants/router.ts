export enum Routes {
    MAIN = 'main',
    LOGIN = 'login'
}

export const RoutesPaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.LOGIN]: 'login'
};
