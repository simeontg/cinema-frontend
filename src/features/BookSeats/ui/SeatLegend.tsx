import { FC } from 'react';
import { useTranslation } from 'shared/hooks/i18nHook';

import { CoupleSeatIcon, SeatIcon, VIPSeatIcon } from 'shared/ui';

export const SeatLegend: FC = () => {
    const { t } = useTranslation('common');

    return (
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 mt-20">
            <div className="flex items-center gap-2">
                <CoupleSeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">{t('coupleSeat')}</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">{t('regularSeat')}</p>
            </div>
            <div className="flex items-center gap-2">
                <VIPSeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">{t('vipSeat')}</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#abacae" px="26px" />
                <p className="text-sm">{t('reservedSeat')}</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#6e3996" px="26px" />
                <p className="text-sm">{t('yourCurrentlySelectedSeat')}</p>
            </div>
        </div>
    );
};
