import { Seat } from 'entities/hall/model/types';

import { FormFieldSeat } from '../types';

export const transformSeats = (seats: Seat[]): FormFieldSeat[] => {
    const groupedSeats: FormFieldSeat[] = [];
    let currentType: string | null = null;
    let currentCount = 0;
    seats.forEach((seat) => {
        if (seat.seat_type === currentType) {
            currentCount++;
        } else {
            if (currentType !== null) {
                groupedSeats.push({ seatType: currentType, seatCount: currentCount });
            }
            currentType = seat.seat_type;
            currentCount = 1;
        }
    });

    if (currentType !== null) {
        groupedSeats.push({ seatType: currentType, seatCount: currentCount });
    }

    return groupedSeats;
};
