interface Seat {
    id: string;
    seat_type: "VIP" | "couple" | "regular";
    price: number;
    name: string;
    reserved: boolean;
}

export interface HallPlan {
    [key: string]: Seat[];
}