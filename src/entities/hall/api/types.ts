import { GetCinemaDto } from 'entities/cinema/api/types';

export interface GetHallDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    hall_name: string;
    hall_plan: HallPlan;
    cinema: GetCinemaDto;
}

export interface CreateHallDto {
    cinemaId: string;
    hallName: string;
    hallPlan: HallPlan;
}

export interface UpdateHallDto extends CreateHallDto {
    id: string;
}


export interface Seat {
    seatType: string;
    seatCount: number;
}

export interface Row {
    rowIndex: number;
    seats: Seat[];
}

export interface HallPlan extends Array<Row> {}