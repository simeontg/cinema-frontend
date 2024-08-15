import { FC } from 'react';

import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

import { Button, Dialog } from 'shared/ui';

interface ConfirmationDialogProps {
    open: boolean;
    city: string;
    cinema: string;
    movieTitle: string;
    date: Date;
    time: string;
    onClose: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
    open,
    city,
    cinema,
    time,
    date,
    movieTitle,
    onClose
}) => {
    return (
        <Dialog onClose={onClose} open={open}>
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
                <div className="flex justify-center lg:justify-start gap-5 px-4 mt-32">
                    <Button
                        variant="outlined"
                        className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        className="!p-6 !mt-6 !w-[220px] !bg-[#6e3996] !pointer-events-auto !rounded-full !h-[50px] !text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
