import { FC, useState } from 'react';

import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteHallMutation } from 'entities/hall/hooks/useDeleteHall';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Alert, Dialog } from 'shared/ui';

import { RenderHallPlan } from './RenderHallPlan';

interface HallCardProps {
    id: string;
    name: string;
    cinema: string;
    onEditClick: () => void;
}

export const HallCard: FC<HallCardProps> = ({ name, cinema, id, onEditClick }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showHallPlanDialog, setShowHallPlanDialog] = useState(false);
    const [mutationError, setMutationError] = useState('');
    const { mutate: deleteHall } = useDeleteHallMutation();
    const queryClient = useQueryClient();
    const { t } = useTranslation('common');

    const onDelete = (hallId: string) => {
        deleteHall(hallId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['halls'] });
                setShowDeleteDialog(false);
            },
            onError: () => {
                setMutationError('This hall is already used in reservation.');
            }
        });
    };

    return (
        <div className="flex p-16 border-2 justify-center flex-col">
            <h1 className="text-center text-lg font-bold mb-4">{name}</h1>
            <p className="text-center">{cinema}</p>
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
            <div className="flex justift-center self-center items-center">
                <Button
                    className="!bg-[#eb6728] !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                    onClick={() => setShowHallPlanDialog(true)}
                >
                    {t('viewHallPlan')}
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
            {showHallPlanDialog && <RenderHallPlan
                open={showHallPlanDialog}
                onClose={() => setShowHallPlanDialog(false)}
                id={id}
                name={name}
            />}
        </div>
    );
};
