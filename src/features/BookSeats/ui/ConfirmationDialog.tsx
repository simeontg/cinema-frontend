import { FC } from 'react';

import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUpdateReservationMutation } from 'entities/reservation/hooks/useUpdateReservation';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Button, Dialog } from 'shared/ui';
import { generateMovieRoute } from 'shared/utils/routesUtils';

import { Seat } from '../types/seat';

interface ConfirmationDialogProps {
    open: boolean;
    city: string;
    cinema: string;
    movieTitle: string;
    date: Date;
    time: string;
    onClose: () => void;
    seats: Seat[];
    movieId: string;
    price: number;
    reservationId: string;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
    open,
    city,
    cinema,
    time,
    date,
    movieTitle,
    onClose,
    seats,
    movieId,
    price,
    reservationId
}) => {
    const { t } = useTranslation('common');
    const { mutate: updateReservation } = useUpdateReservationMutation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { width } = useScreenSize();

    const onConfirmation = () => {
        queryClient.invalidateQueries({ queryKey: ['hallPlan'] });
        navigate(generateMovieRoute(movieId));
    };

    return (
        <Dialog fullScreen={width < 770 ? true : false} onClose={onClose} open={open}>
            <div className="p-10">
                <h1 className="text-center mb-4 text-lg font-bold text-black">{city}</h1>
                <div className="flex gap-4 mb-4">
                    <PlayArrowOutlinedIcon />
                    <p>{movieTitle}</p>
                </div>
                <div className="flex mb-4 gap-4 items-center">
                    <ScheduleOutlinedIcon />
                    <p>
                        {time}, {new Date(date).toDateString()}
                    </p>
                </div>
                <div className="flex mb-4 gap-4">
                    <EventSeatOutlinedIcon />
                    <p>{cinema}</p>
                </div>
                <div className="flex flex-wrap gap-8 mb-4">
                    {seats.map((seat) => (
                        <div key={seat.id} className="flex flex-col">
                            <p>{seat.seat_type}</p>
                            <p>{seat.name}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start md:justify-between my-12">
                    <p className="text-3xl font-bold">{t('orderTotal')}</p>
                    <p className="text-2xl font-bold">${price}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 px-4 mt-20">
                    <Button
                        variant="outlined"
                        className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[140px] md:!w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-sm !md:text-lg"
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        variant="outlined"
                        className="!p-6 !mt-6 !w-[140px] md:!w-[220px] !bg-[#6e3996] !pointer-events-auto !rounded-full !h-[50px] !text-sm !md:text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                        onClick={() => {
                            updateReservation(
                                {
                                    total_price: price,
                                    hallSeats: seats.map(({ id, name }) => ({ id, name })),
                                    reservationId: reservationId
                                },
                                { onSuccess: () => onConfirmation() }
                            );
                        }}
                    >
                        {t('confirm')}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
