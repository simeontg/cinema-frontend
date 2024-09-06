import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { createSession } from '../api';
import { CreateSessionDto } from '../api/types';
import { Session } from '../model/types';

export const useCreateSessionMutation = () => {
    const mutation = useMutation<Session, NetworkError, CreateSessionDto>({
        mutationFn: (sessionData: CreateSessionDto) => {
            return createSession(sessionData);
        }
    });

    return mutation;
};
