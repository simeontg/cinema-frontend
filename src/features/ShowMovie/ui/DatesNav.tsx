import { FC, useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import clsx from 'clsx';

import { mapDayToLetter, mapMonthToLetter } from 'shared/utils/dateUtils';

import { Date } from './Date';

interface DatesNavProps {
    dates: Date[];
}
const visibleItemsCount = 7;

export const DatesNav: FC<DatesNavProps> = ({ dates }) => {
    const [startIndex, setStartIndex] = useState(0);

    const shiftLeft = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const shiftRight = () => {
        if (startIndex + visibleItemsCount < dates.length) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className="h-[150px] font-effra bg-gray-200 flex gap-16 items-center justify-center max-w-full">
            <ArrowBackIosIcon
                className={clsx(
                    'cursor-pointer justify-self-start',
                    dates.length > visibleItemsCount ? '!block' : '!hidden',
                    startIndex === 0 ? 'text-gray-400 pointer-events-none' : 'hover:scale-125'
                )}
                fontSize="large"
                onClick={shiftLeft}
            />
            <div className="flex gap-6">
                {dates.slice(startIndex, startIndex + visibleItemsCount).map((date) => {
                    const day = mapDayToLetter(date.getDay());
                    const month = mapMonthToLetter(date.getMonth());
                    const convertedDate = date.getDate();
                    return (
                        <Date key={convertedDate} day={day} month={month} date={convertedDate} />
                    );
                })}
            </div>
            <ArrowForwardIosIcon
                className={clsx(
                    'cursor-pointer justify-self-end',
                    dates.length > visibleItemsCount ? '!block' : '!hidden',
                    startIndex + visibleItemsCount === dates.length
                        ? 'text-gray-400 pointer-events-none'
                        : 'hover:scale-125'
                )}
                fontSize="large"
                onClick={shiftRight}
            />
        </div>
    );
};
