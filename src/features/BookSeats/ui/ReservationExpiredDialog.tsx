import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog } from 'shared/ui';
import { generateMovieRoute } from 'shared/utils/routesUtils';

interface ReservationExpiredDialogProps {
    open: boolean;
    movieId: string;
}

export const ReservationExpiredDialog: FC<ReservationExpiredDialogProps> = ({ open, movieId }) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open}>
            <div className='md:p-24 p-8 flex flex-col items-center justify-center'>
                <p>Reservation has expired</p>
                <Button
                    variant="outlined"
                    className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-lg"
                    onClick={() => navigate(generateMovieRoute(movieId))}
                >
                    Go Back
                </Button>
            </div>
        </Dialog>
    );
};
