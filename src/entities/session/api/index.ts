import { GetSessionDto } from "./types";
import { $api } from "shared/api/api";

export const getSessions = async (): Promise<GetSessionDto> => {
    const response = await $api.get(`/session`);

    return response.data;
};