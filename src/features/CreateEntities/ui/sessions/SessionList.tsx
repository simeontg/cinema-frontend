import { FC, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDeleteSession } from 'entities/session/hooks/useDeleteSession';
import { useGetSessions } from 'entities/session/hooks/useGetSessions';
import { Session } from 'entities/session/model/types';
import { useTranslation } from 'shared/hooks/i18nHook';
import { ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { SessionCard } from './SessionCard';

interface SessionListProps {
    movieId?: string;
    onEditClick: (session: Session) => void;
}

export const SessionList: FC<SessionListProps> = ({ movieId, onEditClick }) => {
    const queryClient = useQueryClient();
    const [mutationError, setMutationError] = useState('');
    const { data: sessions, isLoading, isError } = useGetSessions(movieId);
    const { mutate: deleteSession } = useDeleteSession();
    const { t } = useTranslation('common');

    const onDeleteClick = (sessionId: string, movieId: string) => {
        deleteSession(sessionId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['sessions', movieId] });
            },
            onError: () => {
                setMutationError(t('sessionPartOfReservationCannotBeDeleted'));
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[350px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (sessions?.length === 0) {
        return <p className="text-center text-2xl py-12">{t('noSessionsYet')}</p>;
    }
    return (
        <ErrorWrapper isError={isError}>
            <div className="flex justify-center mb-6 flex-wrap gap-4">
                {sessions?.map((session) => (
                    <SessionCard
                        onEditClick={() => onEditClick(session)}
                        onDelete={() => onDeleteClick(session.id, session.movie.id)}
                        key={session.date + session.startTime}
                        movieTitle={session.movie.title}
                        cinemaName={session.cinema.name}
                        hallName={session.hall.hall_name}
                        date={session.date}
                        errorMessage={mutationError}
                        time={session.startTime}
                    />
                ))}
            </div>
        </ErrorWrapper>
    );
};
