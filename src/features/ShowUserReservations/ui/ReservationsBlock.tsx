import { FC, useState } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Tab, Tabs } from 'shared/ui';

import { ReservationsList } from './ReservationsList';

export const ReservationsBlock: FC = () => {
    const { t } = useTranslation('common');
    const [tabValue, setTabValue] = useState(0);

    return (
        <div>
            <div className="font-effra h-[250px] mb-10 bg-[url('https://moviereservations.s3.eu-central-1.amazonaws.com/Rectangle.png')]">
                <h1 className="md:pl-20 pt-28 text-white text-center md:text-start font-bold text-3xl">
                    {t('myReservations')}
                </h1>
            </div>
            <Tabs value={tabValue} centered={true}>
                <Tab onClick={() => setTabValue(0)} label={t('upcoming')}></Tab>
                <Tab onClick={() => setTabValue(1)} label={t('alreadySeen')}></Tab>
            </Tabs>
            {tabValue === 0 && <ReservationsList fetchExpired={false} />}
            {tabValue === 1 && <ReservationsList fetchExpired={true} />}
        </div>
    );
};
