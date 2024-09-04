import { useMutation } from '@tanstack/react-query';

import { updateSession } from '../api';
import { UpdateSessionDto } from '../api/types';

export const useUpdateSessionMutation = () => {
    const mutation = useMutation({
        mutationFn: (sessionData: UpdateSessionDto) => {
            return updateSession(sessionData);
        }
    });

    return mutation;
};
