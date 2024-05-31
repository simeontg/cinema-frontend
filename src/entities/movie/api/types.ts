export interface GetTrendedMovieDTO {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    duration: number;
}

export interface GetMovieDto {
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

export interface GetPaginatedMoviesDto {
    items: GetMovieDto[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    };
}
