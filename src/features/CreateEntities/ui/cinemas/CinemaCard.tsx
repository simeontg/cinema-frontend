import { FC, useState } from 'react';

import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteCinemaMutation } from 'entities/cinema/hooks/useDeleteCinema';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Alert, Dialog } from 'shared/ui';

interface CinemaCardProps {
    id: string;
    name: string;
    city: string;
    onEditClick: () => void;
}

export const CinemaCard: FC<CinemaCardProps> = ({ name, city, id, onEditClick }) => {
    const { mutate: deleteCinema } = useDeleteCinemaMutation();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [mutationError, setMutationError] = useState('');

    const queryClient = useQueryClient();
    const { t } = useTranslation('common');

    const onDelete = (cinemaId: string) => {
        deleteCinema(cinemaId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cinemas'] });
                setShowDeleteDialog(false);
            },
            onError: () => {
                setMutationError('This cinema is part of reservation an cannot be deleted');
            }
        });
    };

    return (
        <div className="flex p-16 border-2 justify-center flex-col">
            <h1 className="text-center text-lg font-bold mb-4">{name}</h1>
            <p className="text-center">{city}</p>
            <div className="flex gap-6">
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
            <Dialog onClose={() => setShowDeleteDialog(false)} open={showDeleteDialog}>
                {mutationError && (
                    <div className="flex justify-center mt-6">
                        <Alert className="max-w-[250px] text-center" severity="error">
                            {mutationError}
                        </Alert>
                    </div>
                )}
                <div className="flex flex-col gap-4 p-24">
                    <h1>
                        {t('proceedWithDeleting')} <span className="font-bold">{name}</span>?
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
