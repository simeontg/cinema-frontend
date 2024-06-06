export interface TrendedMovie {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    duration: number;
    genre: string;
}

export interface Movie {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    duration: number;
    imageUrl: string;
    genre: string;
    releaseDate: Date;
    trended: boolean;
}
