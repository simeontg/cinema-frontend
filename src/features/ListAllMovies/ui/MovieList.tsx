import { FC, useState } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, Tab, Tabs } from 'shared/ui';

import { MovieItem } from './MovieItem';
import { movies } from './mock';

interface MovieListProps {}

export const MovieList: FC<MovieListProps> = () => {
    const [tabValue, setTabValue] = useState(0);

    const { t } = useTranslation('main');

    return (
        <div className="max-w-[1400px] block m-auto">
            <Tabs value={tabValue} className="ml-10">
                <Tab onClick={() => setTabValue(0)} className="text-lg" label={t('whatsOn')}></Tab>
                <Tab onClick={() => setTabValue(1)} label={t('whatsComing')}></Tab>
            </Tabs>
            <div className="flex gap-8 flex-wrap mt-5 mb-8 pl-10 max-w-[1400px]">
                {tabValue === 0 &&
                    movies.map((movie) => (
                        <MovieItem
                            key={movie.id}
                            genre={movie.genre}
                            duration={movie.duration}
                            title={movie.title}
                            imageUrl={movie.imageUrl}
                        />
                    ))}
            </div>
            <Button variant="outlined">{t('loadMore')}</Button>
        </div>
    );
};
