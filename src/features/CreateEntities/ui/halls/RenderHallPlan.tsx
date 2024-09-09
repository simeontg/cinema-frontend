import { FC } from 'react';

import { useGetHallPlan } from 'entities/hall/hooks/useGetHallPlan';
import { getSeatIcon } from 'features/BookSeats/utils/getSeatIcon';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Button, Dialog, LoadingSpinner } from 'shared/ui';

interface RenderHallPlanProps {
    onClose: () => void;
    open: boolean;
    name: string;
    id: string;
}

export const RenderHallPlan: FC<RenderHallPlanProps> = ({ onClose, open, name, id }) => {
    const { width } = useScreenSize();
    const { t } = useTranslation('common');
    const { data: hallPlan, isLoading } = useGetHallPlan(id, undefined, open);
    console.log('renderhallplan')
    if (isLoading) {
        return (
            <Dialog open={true} fullScreen={true}>
                <LoadingSpinner />
            </Dialog>
        );
    }

    return (
        <Dialog fullScreen={true} onClose={onClose} open={open}>
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-center mb-12 text-4xl">{name}</h1>
                <div className="flex gap-12 justify-center items-center flex-col">
                    {hallPlan &&
                        Object.entries(hallPlan).map(([row, seats]) => {
                            return (
                                <div
                                    className="overflow-auto flex gap-4 md:gap-12 items-center"
                                    key={row}
                                >
                                    <p className="opacity-40 text-sm">{row}</p>
                                    <div className="flex gap-2">
                                        {seats.map((seat) => {
                                            return (
                                                <button
                                                    key={seat.id}
                                                    className="pointer-events-none"
                                                >
                                                    {getSeatIcon(
                                                        seat.seat_type,
                                                        seat.reserved,
                                                        false,
                                                        width < MOBILE_SCREEN_WIDTH
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="text-sm opacity-40">{row}</p>
                                </div>
                            );
                        })}
                </div>
                <Button
                    variant="outlined"
                    className="!border-2 hover:!border-[#6e3996] !text-[#6e3996] !px-4 !py-2 !mt-8 !bg-transparent hover:!bg-white"
                    onClick={onClose}
                >
                    {t('goBack')}
                </Button>
            </div>
        </Dialog>
    );
};
