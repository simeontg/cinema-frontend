import { FC, useState } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Tab, Tabs } from 'shared/ui';

import { MoviesList } from './MoviesList';

interface MovieListProps {}

export const MovieList: FC<MovieListProps> = () => {
    const [tabValue, setTabValue] = useState(0);

    const { t } = useTranslation('main');

    return (
        <div className="max-w-[1400px] block m-auto">
            <Tabs value={tabValue} className="ml-10">
                <Tab onClick={() => setTabValue(0)} style={{color: tabValue === 0 ? '#6e3996' : '', fontWeight: tabValue === 0 ? 'bold' : ''}} label={t('whatsOn')}></Tab>
                <Tab onClick={() => setTabValue(1)} style={{color: tabValue === 1 ? '#6e3996' : '', fontWeight: tabValue === 1 ? 'bold' : ''}} label={t('whatsComing')}></Tab>
            </Tabs>
            {tabValue === 0 && <MoviesList type="current" limit={18} />}
            {tabValue === 1 && <MoviesList type="upcoming" limit={18} />}
        </div>
    );
};
