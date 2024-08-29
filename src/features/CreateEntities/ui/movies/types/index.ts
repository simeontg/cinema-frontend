export interface SelectedMovie {
    title: string;
    description: string;
    trended: boolean;
    genre: string;
    duration: number;
    releaseDate: string;
    id: string;
}

export type FormFields = {
    title: string;
    description: string;
    duration: string;
    image: File | null;
    genre: string;
    releaseDate: string;
    trended: boolean;
};