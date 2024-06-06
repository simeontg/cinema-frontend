import { CSSProperties, FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import clsx from 'clsx';

import { transformMinutesToHours } from 'shared/utils/transformMinutesToHours';

import { SelectedMovie } from '../types';

interface MovieDetailsProps {
    style?: CSSProperties;
    description: string;
    title: string;
    imageUrl: string;
    duration: number;
    genre: string;
    isVisible: boolean;
    setSelectedMovie: React.Dispatch<React.SetStateAction<SelectedMovie>>;
}

export const MovieDetails: FC<MovieDetailsProps> = ({
    style,
    description,
    title,
    genre,
    imageUrl,
    duration,
    isVisible,
    setSelectedMovie
}) => {
    const handleClose = () => {
        setSelectedMovie({
            description: '',
            title: '',
            rowIndex: null,
            genre: '',
            duration: 0,
            imageUrl: ''
        });
    };
    return (
        <div
            style={style}
            className={clsx('hidden max-w-[1400px] pr-12 relative', isVisible && 'md:block')}
        >
            <button className="absolute top-2 right-14 text-white" onClick={handleClose}>
                <CloseIcon />
            </button>
            <div className="bg-black w-full text-white font-effra flex space-between">
                <div className="m-12">
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    <p className="mb-4">{genre}</p>
                    <div className="flex mb-4 text-sm gap-2">
                        <ScheduleIcon />
                        <p>{transformMinutesToHours(duration)}</p>
                    </div>
                    <p className="w-3/4 text-sm">{description}</p>
                </div>
                <div
                    className="w-full"
                    style={{
                        boxShadow: 'inset 0px -5px 32px 46px rgba(0,0,0,1)',
                        background: `url(${imageUrl}) center/cover`
                    }}
                ></div>
            </div>
        </div>
    );
};
