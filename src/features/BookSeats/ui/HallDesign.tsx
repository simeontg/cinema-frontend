import { FC } from 'react';

import clsx from 'clsx';

import { useGetHallPlan } from 'entities/hall/hooks/useGetHallPlan';
import { ErrorWrapper, LoadingSpinner, Tooltip } from 'shared/ui';

import { Seat } from '../types/seat';
import { getSeatIcon } from '../utils/getSeatIcon';
import { SeatLegend } from './SeatLegend';

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
    const { data: hallPlan, isLoading, isError } = useGetHallPlan(hallId, sessionId);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const hallEntries = Object.entries(hallPlan);

    return (
        <ErrorWrapper isError={isError}>
            <div className="w-full lg:w-2/3 flex-grow-0 flex-shrink-0 h-[700px]">
                <div className="w-full">
                    <img
                        className="w-full mb-16"
                        src="https://moviereservations.s3.eu-central-1.amazonaws.com/screen.jpg"
                    />
                    <div className="flex gap-12 items-center flex-col">
                        {hallEntries.map(([row, seats]) => {
                            return (
                                <div className="flex gap-12 items-center" key={row}>
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
                                                        <div className='flex gap-2'>
                                                            <div className="flex items-center flex-col">
                                                                <p className='text-md'>ROW</p>
                                                                <p className='text-2xl font-bold'>{row}</p>
                                                            </div>
                                                            <div className="flex items-center flex-col">
                                                                <p>SEAT</p>
                                                                <p className='text-2xl font-bold'>{idx + 1}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <button
                                                        className={clsx(
                                                            seat.reserved && 'pointer-events-none'
                                                        )}
                                                        onClick={() => onSeatClick(seat)}
                                                    >
                                                        {getSeatIcon(
                                                            seat.seat_type,
                                                            seat.reserved,
                                                            isSelected
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
            </div>
        </ErrorWrapper>
    );
};
