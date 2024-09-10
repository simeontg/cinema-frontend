import { FC, useState } from 'react';

import clsx from 'clsx';

import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Tab, Tabs } from 'shared/ui';

import { ManageCinemas } from './cinemas/ManageCinemas';
import { ManageHalls } from './halls/ManageHalls';
import { ManageMovies } from './movies/ManageMovies';
import { ManageSessions } from './sessions/ManageSessions';

export const CreateEntitiesBlock: FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const { t } = useTranslation('common');
    const { width } = useScreenSize();
    return (
        <div className="font-effra flex md:block flex-col items-center md:ml-12 mt-4">
            <Tabs
                orientation={width < MOBILE_SCREEN_WIDTH ? 'vertical' : 'horizontal'}
                value={tabValue}
            >
                <Tab
                    onClick={() => setTabValue(0)}
                    className={clsx(tabValue === 0 && '!text-[#6e3996] !font-bold', '!text-sm')}
                    label={t('manageMovies')}
                ></Tab>
                <Tab
                    onClick={() => setTabValue(1)}
                    className={clsx(tabValue === 1 && '!text-[#6e3996] !font-bold', '!text-sm')}
                    label={t('manageCinemas')}
                ></Tab>
                <Tab
                    onClick={() => setTabValue(2)}
                    className={clsx(tabValue === 2 && '!text-[#6e3996] !font-bold', '!text-sm')}
                    label={t('manageSessions')}
                ></Tab>
                <Tab
                    onClick={() => setTabValue(3)}
                    className={clsx(tabValue === 3 && '!text-[#6e3996] !font-bold', '!text-sm')}
                    label={t('manageHalls')}
                ></Tab>
            </Tabs>
            {tabValue === 0 && <ManageMovies />}
            {tabValue === 1 && <ManageCinemas />}
            {tabValue === 2 && <ManageSessions />}
            {tabValue === 3 && <ManageHalls />}
        </div>
    );
};
