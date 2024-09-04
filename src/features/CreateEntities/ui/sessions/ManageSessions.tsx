import { FC, useState } from 'react';

import { InputLabel } from '@mui/material';

import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { Session } from 'entities/session/model/types';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, ErrorWrapper, MenuItem, Select } from 'shared/ui';

import { SessionList } from './SessionList';
import { SessionsForm } from './SessionsForm';

export const ManageSessions: FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const { t } = useTranslation('common');

    const { data: movies } = useGetPaginatedMovies('all', 1000, { title: '', genre: '' });

    const onClose = () => {
        setIsFormOpen(false);
    };

    const onEditClick = (session: Session) => {
        setSelectedSession(session);
        setIsFormOpen(true);
    };

    return (
        <ErrorWrapper>
            <div className="flex flex-col items-center sm:items-start">
                <Button
                    className="!mb-12 !bg-[#6e3996] !w-40 !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                    onClick={() => {
                        setSelectedSession(null);
                        setIsFormOpen(true);
                    }}
                >
                    {t('createSession')}
                </Button>
            </div>
            {movies && (
                <div className="flex justify-center flex-col sm:justify-start">
                    <InputLabel className="text-center sm:text-start">
                        {t('selectMovieToViewSessions')}
                    </InputLabel>
                    <Select
                        value={selectedMovieId}
                        className="!w-64"
                        onChange={(e) => setSelectedMovieId(e.target.value)}
                    >
                        {movies.pages[0].items.map((movie) => (
                            <MenuItem key={movie.id} value={movie.id}>
                                {movie.title}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )}
            <SessionsForm
                movies={movies?.pages[0].items}
                onClose={onClose}
                open={isFormOpen}
                selectedSession={selectedSession}
            />
            <SessionList onEditClick={onEditClick} movieId={selectedMovieId} />
        </ErrorWrapper>
    );
};
