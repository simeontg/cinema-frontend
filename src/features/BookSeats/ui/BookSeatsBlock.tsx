import { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useCreateReservationMutation } from 'entities/reservation/hooks/useCreateReservation';
import { useGetSession } from 'entities/session/hooks/useGetSession';
import { useTranslation } from 'shared/hooks/i18nHook';
import useTimer from 'shared/hooks/useTimer';
import { Button, Dialog, ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { Seat } from '../types/seat';
import { CountdownTimer } from './CountdownTimer';
import { HallDesign } from './HallDesign';
import { OrderInformation } from './OrderInformation';
import { ReservationExpiredDialog } from './ReservationExpiredDialog';

const MAX_CHOSEN_SEATS = 7;

export const BookSeatsBlock: FC = () => {
    const { t } = useTranslation('common');
    const { id: sessionId } = useParams();
    const { data: session, isError, isLoading } = useGetSession(sessionId!);
    const [chosenSeats, setChosenSeats] = useState<Seat[]>([]);
    const [maximumSeatsExceeded, setMaximumSeatsExceeded] = useState(false);
    const [reservationExpirationDate, setReservationExpirationDate] = useState<Date | null>(null);
    const [reservationId, setReservationId] = useState('');

    const onSeatClick = (seat: Seat) => {
        if (chosenSeats.includes(seat)) {
            setChosenSeats((prev) => prev.filter((p) => p !== seat));
        } else {
            if (chosenSeats.length < MAX_CHOSEN_SEATS) {
                setChosenSeats((prev) => [...prev, seat]);
            } else {
                setMaximumSeatsExceeded(true);
            }
        }
    };

    useEffect(() => {
        if (chosenSeats.length === MAX_CHOSEN_SEATS) {
            setMaximumSeatsExceeded(false);
        }
    }, [chosenSeats]);

    const { mutate: createReservation } = useCreateReservationMutation();

    useEffect(() => {
        if (session) {
            createReservation(
                { total_price: 0, sessionId: session.id },
                {
                    onSuccess: (reservation) => {
                        const expirationDate = new Date(reservation.expires_at);
                        setReservationExpirationDate(expirationDate);
                        setReservationId(reservation.id);
                    }
                }
            );
        }
    }, [sessionId, session]);

    const secondsRemaining = useTimer({ date: reservationExpirationDate });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="flex flex-col lg:px-20">
                <div className="bg-gray-100 py-4 md:gap-60 lg:gap-44 xl:gap-80 items-center justify-start flex w-full">
                    <div className="text-xl md:pr-16 p-8 font-bold">{t('chooseYourSeats')}</div>
                    <CountdownTimer seconds={secondsRemaining} />
                </div>
                <div className="font-effra flex flex-col lg:flex-row w-full">
                    <ReservationExpiredDialog
                        open={secondsRemaining === 0}
                        movieId={session.movie.id}
                    />
                    <HallDesign
                        hallId={session.hall.id}
                        sessionId={session.id}
                        chosenSeats={chosenSeats}
                        onSeatClick={onSeatClick}
                    />
                    <OrderInformation
                        movieTitle={session.movie.title}
                        movieId={session.movie.id}
                        cinema={session.cinema.name}
                        date={session.date}
                        time={session.startTime}
                        city={session.cinema.city.name}
                        seats={chosenSeats}
                        reservationId={reservationId}
                    />
                </div>
            </div>
            <Dialog open={maximumSeatsExceeded} onClose={() => setMaximumSeatsExceeded(false)}>
                <div className="font-effra p-32 flex justify-center flex-col items-center">
                    <h1 className="text-center text-2xl">
                        {t('maxSeatsSelected')} {MAX_CHOSEN_SEATS}!
                    </h1>
                    <Button
                        variant="outlined"
                        className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-lg"
                        onClick={() => setMaximumSeatsExceeded(false)}
                    >
                        {t('back')}
                    </Button>
                </div>
            </Dialog>
        </ErrorWrapper>
    );
};
