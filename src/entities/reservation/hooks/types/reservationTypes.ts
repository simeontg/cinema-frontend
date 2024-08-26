export interface CreateReservationDto {
    total_price: number;
    sessionId: string;
}

export interface UpdateReservationDto {
    total_price: number;
    reservationId: string;
    hallSeats: hallSeat[];
}

interface hallSeat {
    id: string;
    name: string;
}
