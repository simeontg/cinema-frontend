import { GetSessionDto } from 'entities/session/api/types';
import { PaginatedParams } from 'shared/types/dto';

type ReleaseTypeParam = 'current' | 'upcoming' | 'all';

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
    title: string;
    genre: string;
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
    sessions: GetSessionDto;
}

interface BaseMovieData {
    title: string;
    description: string;
    genre: string;
    duration: string;
    releaseDate: string;
    trended: boolean;
}

export interface CreateMovieData extends BaseMovieData {
    image: File;
}

export interface UpdateMovieData extends BaseMovieData {
    image: File | null;
    movieId: string;
}