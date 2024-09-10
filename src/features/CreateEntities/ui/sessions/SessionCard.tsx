import { FC, useState } from 'react';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Alert, Button, Dialog } from 'shared/ui';

interface SessionCardProps {
    time: string;
    date: string;
    hallName: string;
    cinemaName: string;
    movieTitle: string;
    errorMessage: string;
    onEditClick?: () => void;
    onDelete: () => void;
}

export const SessionCard: FC<SessionCardProps> = ({
    time,
    date,
    hallName,
    cinemaName,
    movieTitle,
    errorMessage,
    onEditClick,
    onDelete
}) => {
    const { t } = useTranslation('common');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <div className="flex flex-col items-center p-16 gap-2 mt-6 border-2">
            <h1 className="text-center">{movieTitle}</h1>
            <p className="text-center">
                {date}, {time}
            </p>
            <p className="text-center">
                {cinemaName}, {hallName}
            </p>
            <div className="flex gap-4">
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
                {errorMessage && (
                    <div className="flex justify-center mt-6">
                        <Alert className="max-w-[250px] text-center" severity="error">
                            {errorMessage}
                        </Alert>
                    </div>
                )}
                <div className="flex flex-col gap-4 p-24">
                    <h1 className="text-center">
                        {t('proceedWithDeleting')} <span className="font-bold">session</span>?
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
                            onClick={onDelete}
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
