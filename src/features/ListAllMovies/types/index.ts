export interface Filters {
    title: string;
    genre: string;
}

export interface SelectedMovie {
    title: string;
    description: string;
    genre: string;
    duration: number;
    imageUrl: string;
    rowIndex: number | null;
}
