import { Cinema } from "entities/cinema/model/types";

export interface Session {
    id: string;
    createdAt: string;
    updatedAt: string;
    date: Date;
    time: string;
    ticket_price: number;
    cinema: Cinema;
}