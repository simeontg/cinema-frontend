import { useQuery as BaseUseQuery } from "@tanstack/react-query";



export const useQuery = (queryKey: any, queryFn: any) => {
    return BaseUseQuery({ queryKey, queryFn });
}