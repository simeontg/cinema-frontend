import { FC } from 'react';

interface HallDesignProps {
    hallId: string
}

export const HallDesign: FC<HallDesignProps> = ({ hallId }) => {
    console.log(hallId);
    return <div className="w-full lg:w-2/3 flex-grow-0 flex-shrink-0 bg-black h-[750px]"></div>;
};
