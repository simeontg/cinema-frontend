export interface SelectedHall {
    id: string;
    hall_name: string;
    cinema: {
        id: string;
    };
    hallPlan: HallPlan
}

export interface FormFields {
    cinemaId: string;
    hallName: string;
    hallPlan: HallPlan;
}

export interface FormFieldSeat {
    seatType: string;
    seatCount: number;
}

export interface Row {
    rowIndex: number;
    seats: FormFieldSeat[];
}

export interface HallPlan extends Array<Row> {}
