import { FC } from 'react';

import { Header } from 'layout/Header';
import { Outlet } from 'react-router-dom';

export const RootRoute: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
