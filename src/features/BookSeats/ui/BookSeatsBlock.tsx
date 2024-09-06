import { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useCreateReservationMutation } from 'entities/reservation/hooks/useCreateReservation';
import { useGetSession } from 'entities/session/hooks/useGetSession';
import { useTranslation } from 'shared/hooks/i18nHook';
import useTimer from 'shared/hooks/useTimer';
import { ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { Seat } from '../types/seat';
import { CountdownTimer } from './CountdownTimer';
import { HallDesign } from './HallDesign';
import { OrderInformation } from './OrderInformation';
import { ReservationExpiredDialog } from './ReservationExpiredDialog';

export const BookSeatsBlock: FC = () => {
    const { t } = useTranslation('common');
    const { id: sessionId } = useParams();
    const { data: session, isError, isLoading } = useGetSession(sessionId!);
    const [chosenSeats, setChosenSeats] = useState<Seat[]>([]);
    const [reservationExpirationDate, setReservationExpirationDate] = useState<Date | null>(null);
    const [reservationId, setReservationId] = useState('');

    const onSeatClick = (seat: Seat) => {
        if (chosenSeats.includes(seat)) {
            setChosenSeats((prev) => prev.filter((p) => p !== seat));
        } else {
            setChosenSeats((prev) => [...prev, seat]);
        }
    };

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
    }, [session]);

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
        </ErrorWrapper>
    );
};
