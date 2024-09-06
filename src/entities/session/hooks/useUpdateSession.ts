import { useMutation } from '@tanstack/react-query';

import { NetworkError } from 'shared/types/network';

import { updateSession } from '../api';
import { UpdateSessionDto } from '../api/types';
import { Session } from '../model/types';

export const useUpdateSessionMutation = () => {
    const mutation = useMutation<Session, NetworkError, UpdateSessionDto>({
        mutationFn: (sessionData: UpdateSessionDto) => {
            return updateSession(sessionData);
        }
    });

    return mutation;
};
