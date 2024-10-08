import { FC } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useGetHallPlan } from 'entities/hall/hooks/useGetHallPlan';
import { RESERVATION_WEBSOCKET_URL } from 'shared/constants/api';
import { RESERVATION_SOCKET_ENTITY } from 'shared/constants/socket';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import useSocket from 'shared/hooks/useSocket';
import { ErrorWrapper, Tooltip } from 'shared/ui';

import { Seat } from '../types/seat';
import { ReservationSocketData } from '../types/socket';
import { getSeatIcon } from '../utils/getSeatIcon';
import { SeatLegend } from './SeatLegend';
import { HallDesignSkeleton } from './skeleton/HallDesignSkeleton';

interface HallDesignProps {
    hallId: string;
    sessionId: string;
    chosenSeats: Seat[];
    onSeatClick: (seat: Seat) => void;
}

export const HallDesign: FC<HallDesignProps> = ({
    hallId,
    sessionId,
    onSeatClick,
    chosenSeats
}) => {
    const { width } = useScreenSize();
    const isMobile = width < MOBILE_SCREEN_WIDTH;
    const { t } = useTranslation('common');
    const { data: hallPlan, isLoading, isError } = useGetHallPlan(hallId, sessionId);
    const queryClient = useQueryClient();

    useSocket<ReservationSocketData>({
        url: RESERVATION_WEBSOCKET_URL,
        entity: RESERVATION_SOCKET_ENTITY,
        onListen: ({ sessionId: socketSessionId }) => {
            if (socketSessionId === sessionId) {
                queryClient.invalidateQueries({ queryKey: ['hallPlan', hallId, sessionId] });
            }
        }
    });

    if (isLoading) {
        return <HallDesignSkeleton />;
    }

    const hallEntries = Object.entries(hallPlan);

    return (
        <ErrorWrapper isError={isError}>
            <div className="w-full lg:w-2/3 flex-grow-0 flex-shrink-0 overflow-auto h-[700px]">
                <TransformWrapper initialScale={1} disabled={true}>
                    <TransformComponent>
                        <div className="w-full">
                            <img
                                className="w-full mb-16"
                                src="https://moviereservations.s3.eu-central-1.amazonaws.com/screen.jpg"
                            />
                            <div className="flex gap-12 items-center flex-col">
                                {hallEntries.map(([row, seats]) => {
                                    return (
                                        <div
                                            className="flex gap-4 md:gap-12 items-center"
                                            key={row}
                                        >
                                            <p className="opacity-40 text-sm">{row}</p>
                                            <div className="flex gap-2">
                                                {seats.map((seat, idx) => {
                                                    const isSelected = chosenSeats.some(
                                                        (s) => s.id === seat.id
                                                    );
                                                    return (
                                                        <Tooltip
                                                            key={seat.id}
                                                            title={
                                                                <div className="flex gap-2">
                                                                    <div className="flex items-center flex-col">
                                                                        <p className="text-md">
                                                                            {t('row')}
                                                                        </p>
                                                                        <p className="text-2xl font-bold">
                                                                            {row}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center flex-col">
                                                                        <p>{t('seat')}</p>
                                                                        <p className="text-2xl font-bold">
                                                                            {idx + 1}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <button
                                                                className={clsx(
                                                                    seat.reserved &&
                                                                        'pointer-events-none'
                                                                )}
                                                                onClick={() => onSeatClick(seat)}
                                                            >
                                                                {getSeatIcon(
                                                                    seat.seat_type,
                                                                    seat.reserved,
                                                                    isSelected,
                                                                    isMobile
                                                                )}
                                                            </button>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </div>
                                            <p className="text-sm opacity-40">{row}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <SeatLegend />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </ErrorWrapper>
    );
};
