import { GetCinemaDto } from 'entities/cinema/api/types';
import { HallPlan } from '../model/types';

export interface GetHallDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    hall_name: string;
    hall_plan: HallPlan;
    cinema: GetCinemaDto;
}
