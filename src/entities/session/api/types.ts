import { GetCinemaDto } from 'entities/cinema/api/types';
import { GetHallDto } from 'entities/hall/api/types';

export interface getSessionsParams {
    movieId: string;
}

export interface GetSessionDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    date: string;
    time: string;
    ticket_price: number;
    hall: GetHallDto;
    cinema: GetCinemaDto;
}

export interface CreateSessionDto {
    movie: string;
    cinema: string;
    hall: string;
    date: string;
    time: string;
}

export interface UpdateSessionDto extends CreateSessionDto {
    id: string;
}
