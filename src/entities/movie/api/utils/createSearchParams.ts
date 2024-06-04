import { GetPaginatedMoviesParams } from "../types";

export const createSearchParams = (params: GetPaginatedMoviesParams): URLSearchParams => {
    const searchParams = new URLSearchParams();
    
    for(const [key,value] of Object.entries(params)) {
        if (value) {
            searchParams.append(key, value);
        }
    }
    
    return searchParams;
}