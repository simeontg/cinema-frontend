import { FC } from 'react';

import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';

interface ChosenSeatsProps {
    seats: string[];
}

export const ChosenSeats: FC<ChosenSeatsProps> = ({ seats }) => {
    return (
        <div>
            {seats.length === 0 && (
                <div className="flex flex-col items-center my-16 justify-center gap-4">
                    <ChairOutlinedIcon className="!text-6xl text-gray-500" />
                    <p className="text-gray-500">Please choose your seats first.</p>
                </div>
            )}
        </div>
    );
};
