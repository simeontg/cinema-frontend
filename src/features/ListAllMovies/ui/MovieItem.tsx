import { FC, useState } from 'react';

import clsx from 'clsx';

import { transformMinutesToHours } from 'shared/utils/transformMinutesToHours';

interface MovieItemProps {
    genre: string;
    title: string;
    duration: number;
    imageUrl: string;
}

export const MovieItem: FC<MovieItemProps> = ({ genre, duration, title, imageUrl }) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsInfoVisible(true)}
            onMouseLeave={() => setIsInfoVisible(false)}
            className="font-effra w-48 h-64 rounded-md flex-none relative hover:cursor-pointer"
        >
            <img className="w-full h-full rounded-md" src={imageUrl} />
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
        </div>
    );
};
