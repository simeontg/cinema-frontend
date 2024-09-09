import { FC, useState } from 'react';

import { useGetCinemas } from 'entities/cinema/hooks/useGetCinemas';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { CinemaCard } from './CinemaCard';
import { CinemasForm } from './CinemasForm';
import { SelectedCinema } from './types';

export const ManageCinemas: FC = () => {
    const { t } = useTranslation('common');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCinema, setSelectedCinema] = useState<SelectedCinema | null>(null);

    const onClose = () => {
        setIsFormOpen(false);
    };

    const afterClose = () => {};

    const onEditClick = (cinema: SelectedCinema) => {
        setSelectedCinema(cinema);
        setIsFormOpen(true);
    };

    const { data: cinemas, isLoading, isError } = useGetCinemas();

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
                    {t('createCinema')}
                </Button>
                <h1 className="text-2xl mb-4">{t('listOfCinemas')}</h1>
                <CinemasForm
                    open={isFormOpen}
                    onClose={onClose}
                    afterClose={afterClose}
                    selectedCinema={selectedCinema}
                />
                <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-4">
                    {cinemas.map((cinema) => {
                        return (
                            <CinemaCard
                                key={cinema.id}
                                name={cinema.name}
                                city={cinema.city.name}
                                id={cinema.id}
                                onEditClick={() => onEditClick(cinema)}
                            />
                        );
                    })}
                </div>
            </div>
        </ErrorWrapper>
    );
};
