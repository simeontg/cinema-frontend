import { FC } from 'react';

import ScheduleIcon from '@mui/icons-material/Schedule';

import { transformSecondsToMinutes } from 'shared/utils/transformSecondsToMinutes';
import { useTranslation } from 'shared/hooks/i18nHook';

interface CountdownTimerProps {
    seconds: number | null;
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ seconds }) => {
    const { t } = useTranslation('common');

    if (seconds !== null && seconds > 0) {
        return (
            <div className="bg-gray-100 border-2 p-4 rounded-lg text-gray-500 flex gap-4 items-center justify-center text-lg">
                <ScheduleIcon className="!text-4xl" />
                <div className="flex flex-col items-center">
                    <p className="text-2xl">{transformSecondsToMinutes(seconds)}</p>
                    <p className="text-xs">{t('minsLeft')}</p>
                </div>
            </div>
        );
    }

    return null;
};
