import { FC } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

import { useTranslation } from 'shared/hooks/i18nHook';

export const Footer: FC = () => {
    const { t } = useTranslation('common');
    return (
        <div className="w-full absolute h-60 bg-zinc-900 font-effra flex text-white">
            <div className="pt-14 pl-6 sm:pl-28">
                <h1 className="text-sm sm:text-lg font-bold mb-2">{t('aboutTheDeveloper')}</h1>
                <p>Simeon Georgiev</p>
                <p>+359884387308</p>
                <p>sgeorgiev783@gmail.com</p>
            </div>
            <div className="pt-14 pl-10 sm:pl-24">
                <h1 className="text-lg font-bold mb-2">{t('followMe')}</h1>
                <div className="flex gap-3">
                    <Link to="https://github.com/simeontg">
                        <GitHubIcon className="hover:bg-black" />
                    </Link>
                    <Link to="https://linkedin.com/in/simeon-georgiev-dev">
                        <LinkedInIcon />
                    </Link>
                </div>
            </div>
            <div>
                <p className="absolute bottom-0 left-2/4">&copy; 2024</p>
            </div>
        </div>
    );
};
