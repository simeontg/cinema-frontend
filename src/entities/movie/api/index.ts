import { TrendingMovie } from "../model/types";

const BASE_URL = 'http://localhost:3001';

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    const response = await fetch(`${BASE_URL}/movies/trended`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}