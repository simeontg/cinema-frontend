import { FC } from 'react';

import { useGetUserReservations } from 'entities/reservation/hooks/useGetUserReservations';
import { useTranslation } from 'shared/hooks/i18nHook';
import { ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { Reservation } from './Reservation';

interface ReservationList {
    fetchExpired: boolean;
}

export const ReservationsList: FC<ReservationList> = ({ fetchExpired }) => {
    const { t } = useTranslation('common');
    const { data: reservations, isLoading, isError } = useGetUserReservations(fetchExpired);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="mt-10 font-effra">
                <div className="flex flex-col justify-center items-center my-10">
                    {reservations.length === 0 ? (
                        <p>{t('noReservationsYet')}</p>
                    ) : (
                        reservations.map((reservation) => (
                            <Reservation
                                projectionDate={new Date(reservation.session.date)}
                                projectionTime={reservation.session.startTime}
                                totalPrice={reservation['total_price']}
                                seats={reservation.reservationHallSeats}
                                key={reservation.id}
                                hall={reservation.session.hall.hall_name}
                                cinema={reservation.session.cinema.name}
                                movieTitle={reservation.session.movie.title}
                                reservationDate={new Date(reservation.updatedAt)}
                            />
                        ))
                    )}
                </div>
            </div>
        </ErrorWrapper>
    );
};
