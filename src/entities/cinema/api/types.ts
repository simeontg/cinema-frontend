export interface GetCinemaDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    city: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
    };
}

export interface CreateCinemaDto {
    name: string;
    city: string;
}

export interface UpdateCinemaDto extends CreateCinemaDto {
    id: string;
}
