import { FC } from 'react';

import { CoupleSeatIcon, SeatIcon, VIPSeatIcon } from 'shared/ui';

export const SeatLegend: FC = () => {
    return (
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 mt-20">
            <div className="flex items-center gap-2">
                <CoupleSeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">Couple seat</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">Regular seat</p>
            </div>
            <div className="flex items-center gap-2">
                <VIPSeatIcon color="#ffffff" px="26px" />
                <p className="text-sm">VIP seat</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#abacae" px="26px" />
                <p className="text-sm">Reserved seat</p>
            </div>
            <div className="flex items-center gap-2">
                <SeatIcon color="#6e3996" px="26px" />
                <p className="text-sm">Your currently selected seat</p>
            </div>
        </div>
    );
};
