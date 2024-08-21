import { FC } from 'react';

import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Button } from 'shared/ui';

interface MovieHeaderProps {
    title: string;
    imageUrl: string;
    genre: string;
    duration: number;
    description: string;
}

export const MovieHeader: FC<MovieHeaderProps> = ({
    title,
    imageUrl,
    genre,
    duration,
    description
}) => {
    const { t } = useTranslation('common');

    return (
        <section
            className="py-[120px] flex justify-center lg:justify-start items-center"
            style={{
                background:
                    'url(https://moviereservations.s3.eu-central-1.amazonaws.com/poster-default-bg.jpg) center/cover'
            }}
        >
            <div className="pl-20 pr-20 lg:pr-0 max-w-full flex flex-col lg:flex-row justify-center items-center">
                <div
                    className="md:w-[300px] md:h-[420px] w-[180px] h-[300px]"
                    style={{
                        background: `url(${imageUrl}) center/cover`
                    }}
                ></div>
                <div className="pointer-events-none flex lg:justify-start lg:items-start justify-center items-center md:justify-center md:items-center flex-col text-white mt-10 lg:mt-20 lg:ml-20 inline-block">
                    <h1 className="text-2xl md:text-6xl font-effra font-bold">{title}</h1>
                    <p className="mt-4">{genre}</p>
                    <div className="flex gap-2 mt-4">
                        <ScheduleIcon />
                        <p className="font-effra">{duration} MIN</p>
                    </div>
                    <div className="mt-4 w-60 md:w-96">
                        <p className="font-effra text-sm md:text-md text-center lg:text-start">
                            {description}
                        </p>
                    </div>
                    <Link to={`/movie`}>
                        <Button
                            className="!p-6 !mt-6 !w-[220px] !pointer-events-auto !rounded-full !h-[50px] !text-lg !text-white"
                            style={{
                                background:
                                    'linear-gradient(135deg, #552879 0%, #311758 25%, #170a3f 100%)'
                            }}
                            type="submit"
                        >
                            {t('bookNow')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
