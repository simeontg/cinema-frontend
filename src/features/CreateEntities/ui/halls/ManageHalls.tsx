import { FC, useState } from 'react';

import { useGetHalls } from 'entities/hall/hooks/useGetHalls';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { HallCard } from './HallCard';
import { HallsForm } from './HallsForm';
import { SelectedHall } from './types';

export const ManageHalls: FC = () => {
    const { t } = useTranslation('common');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedHall, setSelectedHall] = useState<SelectedHall | null>(null);

    const onClose = () => {
        setIsFormOpen(false);
        setSelectedHall(null);
    };

    const onEditClick = (hall: SelectedHall) => {
        setSelectedHall(hall);
        setIsFormOpen(true);
    };

    const { data: halls, isLoading, isError } = useGetHalls();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="flex flex-col items-center md:items-start">
                <Button
                    className="!mb-12 !bg-[#6e3996] !w-40 !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                    onClick={() => setIsFormOpen(true)}
                >
                    {t('createHall')}
                </Button>
                <h1 className="text-2xl mb-4">List of halls</h1>
                <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-4">
                    {halls.map((hall) => {
                        return (
                            <HallCard
                                id={hall.id}
                                key={hall.id}
                                name={hall.hall_name}
                                cinema={hall.cinema.name}
                                onEditClick={() => onEditClick(hall)}
                            />
                        );
                    })}
                </div>
                <HallsForm onClose={onClose} selectedHall={selectedHall} open={isFormOpen} />
            </div>
        </ErrorWrapper>
    );
};
