import { ReactNode } from 'react';

import { CoupleSeatIcon, SeatIcon, VIPSeatIcon } from 'shared/ui';

export const getSeatIcon = (
    seatType: string,
    isReserved: boolean,
    isSelected: boolean,
    isMobile: boolean
): ReactNode => {
    const color = isReserved ? '#abacae' : isSelected ? '#6e3996' : '#ffffff';
    const size = isMobile
        ? seatType === 'couple'
            ? '30px'
            : '20px'
        : seatType === 'couple'
          ? '40px'
          : '30px';

    switch (seatType) {
        case 'VIP':
            return <VIPSeatIcon color={color} px={size} />;
        case 'couple':
            return <CoupleSeatIcon color={color} px={size} />;
        case 'regular':
        default:
            return <SeatIcon color={color} px={size} />;
    }
};
