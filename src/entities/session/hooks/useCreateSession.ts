import { useMutation } from '@tanstack/react-query';

import { createSession } from '../api';
import { CreateSessionDto } from '../api/types';

export const useCreateSessionMutation = () => {
    const mutation = useMutation({
        mutationFn: (sessionData: CreateSessionDto) => {
            return createSession(sessionData);
        }
    });

    return mutation;
};
