import { FC } from 'react';

import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import clsx from 'clsx';

import { Seat } from '../types/seat';
import { useTranslation } from 'shared/hooks/i18nHook';

interface ChosenSeatsProps {
    seats: Seat[];
}

export const ChosenSeats: FC<ChosenSeatsProps> = ({ seats }) => {
    const { t } = useTranslation('common');

    return (
        <div className={clsx(seats.length > 0 && 'flex flex-wrap mx-12')}>
            {seats.length === 0 && (
                <div className="flex flex-col items-center my-16 justify-center gap-4">
                    <ChairOutlinedIcon className="!text-6xl text-gray-500" />
                    <p className="text-gray-500">{t('pleaseChooseYourSeatsFirst')}</p>
                </div>
            )}
            {seats.length > 0 &&
                seats.map((seatId) => (
                    <div className="flex flex-col" key={seatId.id}>
                        <p>{seatId.seat_type}</p>
                        <p className="text-lg mr-4">{seatId.name}</p>
                    </div>
                ))}
        </div>
    );
};
