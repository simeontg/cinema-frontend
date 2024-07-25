import { QueryHookReturnData } from "shared/types/hook";
import { Movie } from "../model/types";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api";

export const useGetMovie = <ReturnData = Movie>(id: string): QueryHookReturnData<ReturnData> => {
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const movie = await getMovie(id);
            return movie
        }
    });

    return {
        data: (data ? data : null) as ReturnData,
        isLoading: isFetching,
        isError,
        isSuccess
    };
}
