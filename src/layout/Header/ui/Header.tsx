import { FC } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';

import { LanguageMenu } from './LanguageMenu';

export const Header: FC = () => {
    const { t } = useTranslation('common');

    return (
        <header className="w-full h-20 flex justify-between items-center">
            <div>Logo</div>
            <nav>
                <ul className="flex gap-4 items-center">
                    <li>
                        <a href="/">{t('login')}</a>
                    </li>
                    <li>
                        <LanguageMenu />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
