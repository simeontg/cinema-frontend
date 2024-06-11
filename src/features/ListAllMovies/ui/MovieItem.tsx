import { FC, MouseEventHandler, useState } from 'react';

import clsx from 'clsx';

import { transformMinutesToHours } from 'shared/utils/transformMinutesToHours';

interface MovieItemProps {
    genre: string;
    title: string;
    duration: number;
    imageUrl: string;
    clicked: boolean;
    onClick?: MouseEventHandler;
}

export const MovieItem: FC<MovieItemProps> = ({
    genre,
    duration,
    title,
    imageUrl,
    clicked,
    onClick
}) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsInfoVisible(true)}
            onMouseLeave={() => setIsInfoVisible(false)}
            className={clsx(
                'font-effra w-48 h-64 rounded-md relative hover:cursor-pointer'
            )}
            onClick={onClick}
        >
            <img
                className={clsx(
                    'w-full  bg-gradient-to-t from-black h-full rounded-md object-cover',
                    clicked && 'border-b-4'
                )}
                src={imageUrl}
            />
            {clicked ? (
                <div className="p-3 bg-gradient-to-t from-black absolute -bottom-3 h-[250px] w-full"></div>
            ) : (
                <div className="p-3 rounded-b-md bg-purple-800 absolute bottom-0 w-full">
                    <p className="text-white text-center">{title}</p>
                    <div
                        className={clsx(
                            'items-center gap-4 justify-center text-white text-xs',
                            isInfoVisible ? 'flex' : 'hidden'
                        )}
                    >
                        <p>{genre}</p>
                        <p>|</p>
                        <p>{transformMinutesToHours(duration)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
