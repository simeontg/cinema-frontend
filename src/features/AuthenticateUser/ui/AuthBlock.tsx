import { FC, useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { GOOGLE_AUTH_URL } from 'shared/constants/api';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Tab, Tabs } from 'shared/ui';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const wrapperBackground = { background: 'linear-gradient(to bottom, #cbbcd5 0%, #f6f2f9 100%)' };
const gmailParagraphStyle = { lineHeight: '0.1rem' };

export const AuthBlock: FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [isGmailHovered, setIsGmailHovered] = useState(false);
    const { width } = useScreenSize();

    const { t } = useTranslation('common');

    return (
        <div className="sm:h-[700px] flex justify-center items-center" style={wrapperBackground}>
            <div
                className={clsx(
                    'sm:w-5/6 bg-white rounded-md',
                    tabValue === 0 ? 'min-h-full sm:min-h-[600px]' : 'min-h-full sm:min-h-[650px]'
                )}
            >
                <div className="mt-12 ml-0 sm:ml-24 !mb-10">
                    <Tabs centered={width < 770} value={tabValue}>
                        <Tab
                            onClick={() => setTabValue(0)}
                            className={clsx(tabValue === 0 && '!text-[#6e3996]', '!font-bold')}
                            label={t('login')}
                        ></Tab>
                        <Tab
                            onClick={() => setTabValue(1)}
                            className={clsx(tabValue === 1 && '!text-[#6e3996]', '!font-bold')}
                            label={t('signup')}
                        ></Tab>
                    </Tabs>
                    {tabValue === 0 && <LoginForm />}
                    {tabValue === 1 && <RegisterForm setTabValue={setTabValue} />}
                </div>
                <div className="mt-2">
                    <p
                        className="w-full text-center border-b border-black mt-2.5 mx-0 mb-5 text-sm"
                        style={gmailParagraphStyle}
                    >
                        <span className="py-0 px-5 bg-white">{t('registerWithGmail')}</span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 mb-24 sm:mb-0">
                    <Link to={GOOGLE_AUTH_URL}>
                        <button
                            onMouseEnter={() => setIsGmailHovered(true)}
                            onMouseLeave={() => setIsGmailHovered(false)}
                            className={clsx('p-4 rounded-full', isGmailHovered && 'bg-rose-600')}
                        >
                            <GoogleIcon
                                className={clsx(
                                    'cursor-pointer',
                                    isGmailHovered ? 'text-white' : 'text-rose-600'
                                )}
                                fontSize="large"
                            />
                        </button>
                    </Link>
                    <p
                        className={clsx(
                            'text-xs text-rose-600 mt-1',
                            isGmailHovered ? '' : 'hidden'
                        )}
                    >
                        GMAIL
                    </p>
                </div>
            </div>
        </div>
    );
};
