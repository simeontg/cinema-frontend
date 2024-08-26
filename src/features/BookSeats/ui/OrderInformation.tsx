import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'shared/ui';
import { generateMovieRoute } from 'shared/utils/routesUtils';

import { Seat } from '../types/seat';
import { ChosenSeats } from './ChosenSeats';
import { ConfirmationDialog } from './ConfirmationDialog';
import { SessionInformation } from './SessionInformation';
import { useTranslation } from 'shared/hooks/i18nHook';

interface OrderInformationProps {
    movieTitle: string;
    city: string;
    cinema: string;
    date: Date;
    time: string;
    reservationId: string;
    movieId: string;
    seats: Seat[];
}

export const OrderInformation: FC<OrderInformationProps> = ({
    movieTitle,
    cinema,
    city,
    date,
    time,
    reservationId,
    movieId,
    seats
}) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    useEffect(() => {
        let price = 0;
        seats.forEach((s) => (price += s.price));
        setTotalPrice(price);
    }, [seats]);

    return (
        <div className="w-full md:mt-[-100px] lg:w-1/3 flex-grow-0 flex-shrink-0 bg-gray-100 h-[800px]">
            <p className="text-3xl font-bold ml-6 my-6">{t('yourOrder')}</p>
            <ChosenSeats seats={seats} />
            <SessionInformation
                movieTitle={movieTitle}
                cinema={cinema}
                date={date}
                time={time}
                city={city}
            />
            <div className="text-xl flex justify-between mx-6 mt-12">
                <p>{t('orderTotal')}</p>
                <p>${totalPrice}</p>
            </div>
            <div className="flex justify-center lg:justify-start gap-5 px-4 mt-32">
                <Button
                    onClick={() => navigate(generateMovieRoute(movieId))}
                    variant="outlined"
                    className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-lg"
                >
                    {t('back')}
                </Button>
                <Button
                    variant="outlined"
                    disabled={seats.length === 0}
                    className="!p-6 !mt-6 !w-[220px] !bg-[#6e3996] !pointer-events-auto !rounded-full !h-[50px] !text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                    onClick={() => setShowConfirmationDialog(true)}
                >
                    {t('continue')}
                </Button>
            </div>
            <ConfirmationDialog
                onClose={() => setShowConfirmationDialog(false)}
                time={time}
                date={date}
                open={showConfirmationDialog}
                cinema={cinema}
                city={city}
                movieTitle={movieTitle}
                seats={seats}
                movieId={movieId}
                price={totalPrice}
                reservationId={reservationId}
            />
        </div>
    );
};
