import { FC } from 'react';

import { ExpandMoreOutlined } from '@mui/icons-material';
import { AccordionDetails } from '@mui/material';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Accordion, AccordionSummary } from 'shared/ui';
import { mapMonthToLetter } from 'shared/utils/dateUtils';

import { Seat } from '../types/seat';

interface ReservationProps {
    reservationDate: Date;
    projectionDate: Date;
    projectionTime: string;
    seats: Seat[];
    cinema: string;
    hall: string;
    movieTitle: string;
    totalPrice: number;
}

export const Reservation: FC<ReservationProps> = ({
    reservationDate,
    seats,
    totalPrice,
    projectionDate,
    projectionTime,
    movieTitle,
    hall,
    cinema
}) => {
    const { t } = useTranslation('common');
    return (
        <Accordion className="md:!w-1/2 !w-full mb-6">
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <div className="flex gap-2">
                    <p>{t('reservationMadeOn')}</p>
                    <p>
                        {mapMonthToLetter(reservationDate.getMonth())} {reservationDate.getDate()},
                        {reservationDate.getFullYear()}
                    </p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="flex flex-col">
                    <p>
                        {mapMonthToLetter(projectionDate.getMonth())} {projectionDate.getDate()},
                        {projectionDate.getFullYear()}, {projectionTime}
                    </p>
                    <p>
                        {movieTitle}, {hall}, {cinema}
                    </p>
                </div>
                <div>
                    <h2>{t('reservedSeats')}:</h2>
                    <div className="flex flex-wrap gap-2">
                        {seats.map((seat) => (
                            <div className="w-16" key={seat.id}>
                                {seat.location}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-lg font-bold flex justify-between">
                    <p>{t('orderTotal')}</p>
                    <p>${totalPrice}</p>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};
