export type FormFields = {
    name: string;
    city: string;
};

export interface SelectedCinema {
    id: string;
    name: string;
    city: {
        name: string;
    };
}