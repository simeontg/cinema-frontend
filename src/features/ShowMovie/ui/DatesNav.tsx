import { FC, useEffect, useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import clsx from 'clsx';

import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import useScreenSize from 'shared/hooks/useScreenSize';
import { mapDayToLetter, mapMonthToLetter } from 'shared/utils/dateUtils';

import { Date } from './Date';

interface DatesNavProps {
    dates: Date[];
    setActiveDate: (date: Date) => void;
    activeDate: Date | null;
}

export const DatesNav: FC<DatesNavProps> = ({ dates, setActiveDate, activeDate }) => {
    const [startIndex, setStartIndex] = useState(0);
    const { width } = useScreenSize();
    const visibleItemsCount = width < MOBILE_SCREEN_WIDTH ? 4 : 7;

    useEffect(() => {
        if (startIndex + visibleItemsCount > dates.length) {
            setStartIndex(Math.max(0, dates.length - visibleItemsCount));
        }
    }, [width, dates.length, visibleItemsCount, startIndex]);

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

    useEffect(() => {
        if (dates.length > 0) {
            setActiveDate(dates[0]);
        }
    }, []);

    const onDateClick = (date: Date) => {
        setActiveDate(date);
    };

    return (
        <div className="h-[150px] font-effra bg-gray-200 flex gap-2 md:gap-16 items-center justify-center max-w-full">
            <ArrowBackIosIcon
                className={clsx(
                    'cursor-pointer justify-self-start',
                    dates.length > visibleItemsCount ? '!block' : '!hidden',
                    startIndex === 0 ? 'text-gray-400 pointer-events-none' : 'hover:scale-125'
                )}
                fontSize={width < MOBILE_SCREEN_WIDTH ? 'small' : 'large'}
                onClick={shiftLeft}
            />
            <div className="flex gap-6">
                {dates.slice(startIndex, startIndex + visibleItemsCount).map((date) => {
                    const day = mapDayToLetter(date.getDay());
                    const month = mapMonthToLetter(date.getMonth());
                    const convertedDate = date.getDate();
                    const isActive = activeDate?.getTime() === date.getTime();
                    return (
                        <Date
                            isActive={isActive}
                            onClick={onDateClick}
                            wholeDate={date}
                            key={convertedDate + day + month}
                            day={day}
                            month={month}
                            date={convertedDate}
                        />
                    );
                })}
            </div>
            <ArrowForwardIosIcon
                className={clsx(
                    'cursor-pointer justify-self-end',
                    dates.length > visibleItemsCount ? '!block' : '!hidden',
                    startIndex + visibleItemsCount >= dates.length
                        ? 'text-gray-400 pointer-events-none'
                        : 'hover:scale-125'
                )}
                fontSize={width < MOBILE_SCREEN_WIDTH ? 'small' : 'large'}
                onClick={shiftRight}
            />
        </div>
    );
};
