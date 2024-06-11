import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'layout/Header';
import { Footer } from 'layout/Footer';

export const RootRoute: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
