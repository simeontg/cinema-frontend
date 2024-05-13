import { FC } from "react";
import { useTranslation } from "shared/hooks/i18nHook";

export const Header: FC = () => {

    const { t } = useTranslation('main');

    return (
        <header className="w-full h-20 flex justify-between items-center">
            <div>Logo</div>
            <nav>
                <ul>
                    <li>
                        <a href="/">{t('login')}</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
