import { FC, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, Drawer } from 'shared/ui';

import { LanguageMenu } from './LanguageMenu';

export const Header: FC = () => {
    const { t } = useTranslation('common');

    const [open, setOpen] = useState(false);

    return (
        <header
            style={{ boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.07)' }}
            className="flex justify-between items-center sticky w-full h-20 top-0 z-10 bg-white"
        >
            <div className="w-[135px] h-[85px] ml-10">
                <Link to="/">
                    <img
                        src="https://moviereservations.s3.eu-central-1.amazonaws.com/pngegg.png"
                        className="w-full"
                    />
                </Link>
            </div>
            <nav className="hidden md:block h-full">
                <ul className="flex gap-4 items-center h-full">
                    <li className="h-full hover:border-b-2 hover:border-[#6e3996]">
                        <Link to="/login" className="!h-full">
                            <Button className="!h-full">{t('login')}</Button>
                        </Link>
                    </li>
                    <li className="h-full hover:border-b-2 hover:border-[#6e3996]">
                        <LanguageMenu />
                    </li>
                </ul>
            </nav>
            <nav className="block md:hidden">
                <div className="mr-5 hover:cursor-pointer">
                    <MenuIcon onClick={() => setOpen(true)} />
                    <LanguageMenu />
                </div>
                <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
                    <ul className="flex gap-4 flex-col items-center">
                        <li>
                            <Button>{t('login')}</Button>
                        </li>
                    </ul>
                </Drawer>
            </nav>
        </header>
    );
};
