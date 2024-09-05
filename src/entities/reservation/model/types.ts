export interface Reservation {
    expires_at: Date;
    updatedAt: Date;
    id: string;
    reservationHallSeats: ReservationHallSeat[];
    total_price: number;
    session: Session;
}

interface ReservationHallSeat {
    id: string;
    location: string;
    updatedAt: Date;
}

interface Session {
    date: Date;
    startTime: string;
    movie: {
        title: string;
    };
    hall: {
        hall_name: string;
    };
    cinema: {
        name: string;
    };
}
