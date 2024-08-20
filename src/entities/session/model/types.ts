import { Cinema } from 'entities/cinema/model/types';
import { GetHallDto } from 'entities/hall/api/types';
import { Movie } from 'entities/movie/model/types';

export interface Session {
    id: string;
    createdAt: string;
    updatedAt: string;
    date: Date;
    time: string;
    ticket_price: number;
    cinema: Cinema;
    movie: Movie;
    hall: GetHallDto;
}
