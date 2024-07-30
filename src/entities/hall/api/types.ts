import { GetCinemaDto } from 'entities/cinema/api/types';

export interface GetHallDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    hall_name: string;
    hall_plan: {
        rows: {
            row: string;
            seats: {
                reserved: boolean;
                seat_number: string;
            }[];
        }[];
    };
    cinema: GetCinemaDto;
}
