import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Footer } from 'layout/Footer';
import { Header } from 'layout/Header';

export const RootRoute: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
