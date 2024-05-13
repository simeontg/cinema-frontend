import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'layout/Header';

export const RootRoute: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
