import { Cinema } from 'entities/cinema/model/types';
import { Hall } from 'entities/hall/model/types';
import { Movie } from 'entities/movie/model/types';

export interface Session {
    id: string;
    createdAt: string;
    updatedAt: string;
    date: string;
    startTime: string;
    endTime: string;
    ticket_price: number;
    cinema: Cinema;
    movie: Movie;
    hall: Hall;
}
