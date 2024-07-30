import { FC, useState } from 'react';

import clsx from 'clsx';

import { Button } from 'shared/ui';

const boxShadow = { boxShadow: '1px 14px 26px -3px rgba(0,0,0,0.32)' };

interface ProjectionProps {
    city: string;
    cinema: string;
    timeSlots: string[];
    isVisible: boolean;
}

export const Projection: FC<ProjectionProps> = ({ city, cinema, timeSlots, isVisible }) => {
    const [isContainerHovered, setIsContainerHovered] = useState(false);

    return (
        <div
            className={clsx(
                'flex flex-col xl:flex-row xl:gap-60 gap-12 p-20 items-center ml-6 border-b-2',
                isVisible ? '' : 'hidden'
            )}
            onMouseEnter={() => setIsContainerHovered(true)}
            onMouseLeave={() => setIsContainerHovered(false)}
            style={isContainerHovered ? boxShadow : {}}
        >
            <div
                className={clsx(
                    'flex items-center justify-center',
                    isContainerHovered && 'font-bold'
                )}
            >
                <p>{city}</p>
            </div>
            <div className="flex items-center justify-center">
                <p>{cinema}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {timeSlots.map((timeslot) => (
                    <Button
                        key={timeslot}
                        variant="outlined"
                        className="hover:!bg-[#6e3996] hover:!text-white hover:!border-[#6e3996] !border-[#6e3996] !rounded-full !px-6 !py-1 text-[10px]"
                    >
                        {timeslot}
                    </Button>
                ))}
            </div>
        </div>
    );
};
