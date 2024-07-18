import { FC } from 'react';

import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';

import { Button } from 'shared/ui';

export const MovieHeader: FC = () => {
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
                        background:
                            'url(https://reelcinemas.com//MovieImages/HO00003938.jpg) center/cover'
                    }}
                ></div>
                <div className="pointer-events-none flex lg:justify-start lg:items-start justify-start items-start md:justify-center md:items-center flex-col text-white mt-10 lg:mt-20 lg:ml-20 inline-block">
                    <h1 className="text-2xl md:text-6xl font-effra font-bold">Kung Fu Panda 4</h1>
                    <p className="mt-4">Comedy</p>
                    <div className="flex gap-2 mt-4">
                        <ScheduleIcon />
                        <p className="font-effra">210 MIN</p>
                    </div>
                    <div className="mt-4 w-96">
                        <p className="font-effra text-start md:text-center lg:text-start">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nostrum
                            tenetur, voluptas ut libero architecto? Soluta inventore hic fugiat
                            ullam nam, vel deserunt mollitia error a rem in, voluptate veniam?
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
                            BOOK NOW
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
