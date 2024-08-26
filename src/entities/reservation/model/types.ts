export interface Reservation {
    expires_at: Date;
    updatedAt: Date;
    id: string;
    reservationHallSeats: ReservationHallSeat[];
    total_price: number;
    session: Session;
}

interface ReservationHallSeat {
    id: string,
    name: string,
    updatedAt: Date;
}

interface Session {
    date: Date;
    time: string;
    movie: {
        title: string
    };
    hall: {
        hall_name: string;
    },
    cinema: {
        name: string;
    }
}