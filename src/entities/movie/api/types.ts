import { PaginatedParams } from "shared/types/dto";

type ReleaseTypeParam = 'current' | 'upcoming';

export interface GetTrendedMovieDTO {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    duration: number;
}

export interface GetPaginatedMoviesParams extends PaginatedParams {
    releaseType: ReleaseTypeParam;
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