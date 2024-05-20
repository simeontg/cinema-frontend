import { $api } from "shared/api/api";
import { GetTrendedMovieDTO } from "./types";

export const getTrendedMovies = async (): Promise<GetTrendedMovieDTO[]> => {
    const response = await $api.get<GetTrendedMovieDTO[]>(
        '/movies/trended'
    );
    return response.data;
}