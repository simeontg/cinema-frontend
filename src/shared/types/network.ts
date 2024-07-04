export interface NetworkError extends Error {
    response: {
        data: {
            message: string;
        };
    };
}