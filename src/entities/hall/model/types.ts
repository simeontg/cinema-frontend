import { Cinema } from 'entities/cinema/model/types';

export interface Seat {
    id: string;
    seat_type: 'VIP' | 'couple' | 'regular';
    price: number;
    location: string;
    reserved: boolean;
}

export interface HallPlan {
    [key: string]: Seat[];
}

export interface Hall {
    id: string;
    hall_plan: HallPlan;
    hall_name: string;
    cinema: Cinema;
}
