import { FC, useState } from 'react';

import clsx from 'clsx';

import { transformMinutesToHours } from 'shared/utils/transformMinutesToHours';
import { SelectedMovie } from '../types';

interface MovieItemProps {
    genre: string;
    title: string;
    duration: number;
    imageUrl: string;
    description: string;
    rowIndex: number | null;
    setSelectedMovie: React.Dispatch<React.SetStateAction<SelectedMovie>>;
}

export const MovieItem: FC<MovieItemProps> = ({ genre, duration, description, title, imageUrl, rowIndex, setSelectedMovie }) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const handleClick = () => {
        setSelectedMovie({
            genre,
            duration,
            title,
            description,
            imageUrl,
            rowIndex
        })
    }

    return (
        <div
            onMouseEnter={() => setIsInfoVisible(true)}
            onMouseLeave={() => setIsInfoVisible(false)}
            className={clsx("font-effra w-48 h-64 rounded-md flex-none relative hover:cursor-pointer")}
            onClick={handleClick}
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
