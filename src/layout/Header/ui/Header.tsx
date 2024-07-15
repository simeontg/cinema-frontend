import { FC, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import { useGetUser } from 'entities/user/hooks/useGetUser';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, Drawer } from 'shared/ui';

import { LanguageMenu } from './LanguageMenu';

const headerStyle = { boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.07)' };

export const Header: FC = () => {
    const { t } = useTranslation('common');

    const [open, setOpen] = useState(false);

    const { data: user } = useGetUser();

    return (
        <header
            style={headerStyle}
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
                <ul className="flex items-center h-full">
                    {user ? (
                        <li className="h-full flex text-lg items-center justify-center pr-2 border-b-2 border-b-transparent border-r-[1px]">
                            <p>
                                {t('welcome')}, {user.firstName}
                            </p>
                        </li>
                    ) : (
                        <li className="h-full pr-2 border-b-2 border-b-transparent hover:border-b-[#6e3996] border-r-[1px]">
                            <Link to="/login" className="!h-full !w-full">
                                <Button className="!h-full !w-full !text-lg !text-black hover:!text-[#6e3996] hover:!bg-transparent !text-base">
                                    {t('login')}
                                </Button>
                            </Link>
                        </li>
                    )}
                    <li className="h-full pl-2 pr-2 border-b-2 border-transparent hover:border-[#6e3996]">
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
