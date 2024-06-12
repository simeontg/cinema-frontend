export const createSearchParams = <T extends Record<string, string | number>>(
    params: T
): URLSearchParams => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value) {
            searchParams.append(key, value.toString());
        }
    }

    return searchParams;
};
