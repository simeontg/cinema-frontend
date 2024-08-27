import { FC, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Link } from 'react-router-dom';

import { useSignOutMutation } from 'entities/user/hooks/useSignOut';
import { useAuthContext } from 'shared/contexts/authContext';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, Drawer } from 'shared/ui';

import { LanguageMenu } from './LanguageMenu';
import { UserRole } from 'entities/user/api/role.enum';

const headerStyle = { boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.07)' };

export const Header: FC = () => {
    const { t } = useTranslation('common');

    const [open, setOpen] = useState(false);

    const { mutate: signOut } = useSignOutMutation();

    const { account } = useAuthContext();
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
                    {account ? (
                        <>
                            <li className="h-full flex text-lg items-center justify-center pr-2  border-b-2 border-b-transparent border-r-[1px]">
                                <Button className="!cursor-default !h-full !w-full !text-lg !text-black hover:!bg-transparent !text-base">
                                    <PermIdentityOutlinedIcon />
                                    {t('welcome')}, {account.firstName}
                                </Button>
                            </li>
                            <li className="h-full flex text-lg items-center justify-center pl-2 pr-2 hover:border-b-[#6e3996] border-b-2 border-b-transparent border-r-[1px]">
                                <Link to="profile">
                                    <Button className="!h-full !w-full !text-lg !text-black hover:!text-[#6e3996] hover:!bg-transparent !text-base">
                                        {t('myAccount')}
                                    </Button>
                                </Link>
                            </li>
                            {account.role === UserRole.Admin && (
                                <li className="h-full flex text-lg items-center justify-center pl-2 pr-2 hover:border-b-[#6e3996] border-b-2 border-b-transparent border-r-[1px]">
                                    <Link to="dashboard">
                                        <Button className="!h-full !w-full !text-lg !text-black hover:!text-[#6e3996] hover:!bg-transparent !text-base">
                                            DASHBOARD
                                        </Button>
                                    </Link>
                                </li>
                            )}
                            <li className="h-full flex text-lg items-center justify-center pl-2 pr-2 hover:border-b-[#6e3996] border-b-2 border-b-transparent border-r-[1px]">
                                <Button
                                    onClick={() => signOut()}
                                    className="!h-full !w-full !text-lg !text-black hover:!text-[#6e3996] hover:!bg-transparent !text-base"
                                >
                                    {t('signOut')}
                                </Button>
                            </li>
                        </>
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
                            {!account ? (
                                <Link to="login">
                                    <Button>{t('login')}</Button>
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link to="profile">
                                        <Button>{t('myAccount')}</Button>
                                    </Link>
                                    <Button onClick={() => signOut()}>{t('signOut')}</Button>
                                </div>
                            )}
                        </li>
                    </ul>
                </Drawer>
            </nav>
        </header>
    );
};
