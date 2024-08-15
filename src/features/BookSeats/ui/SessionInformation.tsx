import { FC } from 'react';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

interface SessionInformationProps {
    movieTitle: string;
    city: string;
    cinema: string;
    date: Date;
    time: string;
}

export const SessionInformation: FC<SessionInformationProps> = ({
    movieTitle,
    cinema,
    city,
    date,
    time
}) => {
    return (
        <div className="mt-6 pl-4">
            <div className="flex gap-4 mb-4">
                <PlayArrowOutlinedIcon />
                <p>{movieTitle}</p>
            </div>
            <div className='flex gap-8 mb-4'>
                <div className="flex gap-4">
                    <PlaceOutlinedIcon />
                    <p>{city}</p>
                </div>
                <div className="flex gap-4">
                    <EventSeatOutlinedIcon />
                    <p>{cinema}</p>
                </div>
            </div>
            <div className="flex gap-8 mb-4">
                <div className="flex gap-4">
                    <CalendarMonthOutlinedIcon />
                    <p>{new Date(date).toDateString()}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <ScheduleOutlinedIcon />
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
};
