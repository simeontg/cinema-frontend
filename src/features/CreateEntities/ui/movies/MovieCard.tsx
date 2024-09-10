import { FC, useState } from 'react';

import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteMovieMutation } from 'entities/movie/hooks/useDeleteMovieMutation';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Alert, Dialog } from 'shared/ui';

interface MovieCardProps {
    title: string;
    id: string;
    imageUrl: string;
    onEditClick: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({ title, onEditClick, imageUrl, id }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [mutationError, setMutationError] = useState('');

    const queryClient = useQueryClient();
    const { mutate: deleteMovieMutation } = useDeleteMovieMutation();
    const { t } = useTranslation('common');

    const onDelete = (movieId: string) => {
        deleteMovieMutation(movieId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['paginatedMovies'] });
                setShowDeleteDialog(false);
            },
            onError: () => {
                setMutationError('This movie is part of reservation an cannot be deleted');
            }
        });
    };

    return (
        <div className="flex p-8 border-2 justify-center flex-col">
            <h1 className="text-center text-lg font-bold mb-4">{title}</h1>
            <div className="w-48 h-60">
                <img
                    className="w-full h-full object-cover"
                    src={imageUrl}
                    alt={`${title} poster`}
                />
            </div>
            <div className="flex justify-between">
                <Button
                    className="!bg-[#6e3996] !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                    onClick={onEditClick}
                >
                    {t('edit')}
                </Button>
                <Button
                    onClick={() => setShowDeleteDialog(true)}
                    className="!bg-[#de2e2e] !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                >
                    {t('delete')}
                </Button>
            </div>
            <Dialog
                onClose={() => {
                    setShowDeleteDialog(false);
                    setMutationError('');
                }}
                open={showDeleteDialog}
            >
                {mutationError && (
                    <div className="flex justify-center mt-6">
                        <Alert className="max-w-[250px] text-center" severity="error">
                            {mutationError}
                        </Alert>
                    </div>
                )}
                <div className="flex flex-col gap-4 p-16">
                    <h1 className="text-center">
                        {t('proceedWithDeleting')} <span className="font-bold">{title}</span>?
                    </h1>
                    <div className="flex gap-12 justify-center">
                        <Button
                            variant="outlined"
                            className="!border-2 hover:!border-[#6e3996] !text-[#6e3996] !px-4 !py-2 !mt-8 !bg-transparent hover:!bg-white"
                            onClick={() => setShowDeleteDialog(false)}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            onClick={() => onDelete(id)}
                            className="!bg-[#de2e2e] !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                        >
                            {t('delete')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
