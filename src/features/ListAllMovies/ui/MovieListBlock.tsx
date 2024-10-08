import { FC, useState } from 'react';

import clsx from 'clsx';

import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Tab, Tabs } from 'shared/ui';

import { MoviesList } from './MoviesList';

interface MovieListProps {}

export const MovieList: FC<MovieListProps> = () => {
    const [tabValue, setTabValue] = useState(0);
    const { width } = useScreenSize();
    const { t } = useTranslation('main');

    return (
        <div className="max-w-[1400px] block m-auto mb-5">
            <Tabs centered={width < 770} value={tabValue} className="md:ml-10 mt-6 md:mt-0">
                <Tab
                    onClick={() => setTabValue(0)}
                    className={clsx(tabValue === 0 && '!text-[#6e3996] !font-bold')}
                    label={t('whatsOn')}
                ></Tab>
                <Tab
                    onClick={() => setTabValue(1)}
                    className={clsx(tabValue === 1 && '!text-[#6e3996] !font-bold')}
                    label={t('whatsComing')}
                ></Tab>
            </Tabs>
            {tabValue === 0 && <MoviesList type="current" limit={18} />}
            {tabValue === 1 && <MoviesList type="upcoming" limit={18} />}
        </div>
    );
};
