import { $api } from "shared/api/api";

export const getCinemas = async () => {
    const response = await $api.get('/cinema');
    return response.data;
};
