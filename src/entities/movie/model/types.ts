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
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    duration: number,
    imageUrl: string,
    genre: string,
    releaseDate: Date,
    trended: boolean
}

export interface PaginatedMovies {
    pages: {
        items: Movie[],
        meta: {
            totalItems: number,
            itemCount: number,
            itemsPerPage: number,
            totalPages: number,
            currentPage: number
        },
        links: {
            first: string,
            previous: string,
            next: string,
            last: string
        }
    }[],
    pageParams: number[]
}