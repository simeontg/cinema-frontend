import { GetTrendedMovieDTO } from "../api/types";
import { TrendedMovie } from "../model/types";

export const mapTrendedMovieDTOToTrendedMovie = (trendedMovieDTO: GetTrendedMovieDTO): TrendedMovie => ({
    ...trendedMovieDTO
});