import { useMutation } from '@tanstack/react-query';

import { deleteSession } from '../api';

export const useDeleteSession = () => {
    const mutation = useMutation({
        mutationFn: (sessionId: string) => {
            return deleteSession(sessionId);
        }
    });

    return mutation;
};
