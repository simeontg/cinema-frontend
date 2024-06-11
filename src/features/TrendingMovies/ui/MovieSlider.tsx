import { FC, useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { TrendedMovie } from 'entities/movie/model/types';

interface MovieSliderProps {
    movies: TrendedMovie[];
}

const MovieSlider: FC<MovieSliderProps> = ({ movies }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex((index) => (index === movies.length - 1 ? 0 : index + 1));
    };

    const showPreviousImage = () => {
        setImageIndex((index) => (index === 0 ? movies.length - 1 : index - 1));
    };

    return (
        <section
            className="w-full h-full relative"
            style={{
                background: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 100%), url(${movies[imageIndex].imageUrl}) center/cover`,
            }}
        >
            <div className="pointer-events-none mt-20 ml-20 inline-block w-[600px] h-[300px]">
                <h1 className="text-6xl font-effra font-bold">{movies[imageIndex].title}</h1>
                <p className="mt-4">{movies[imageIndex].genre.toUpperCase()}</p>
                <div className="flex gap-2 mt-4">
                    <ScheduleIcon />
                    <p className="font-effra">{movies[imageIndex].duration} MIN</p>
                </div>
                <div className="mt-4 w-96">
                    <p className="font-effra">{movies[imageIndex].description}</p>
                </div>
            </div>
            <button
                onClick={showPreviousImage}
                className="block absolute p4 left-5 h-7 w-7 top-1/2"
            >
                <ArrowBackIosIcon className="hover:scale-125" fontSize="large" />
            </button>
            <button onClick={showNextImage} className="block absolute p4 right-5 h-7 w-7 top-1/2">
                <ArrowForwardIosIcon className="hover:scale-125" fontSize="large" />
            </button>
            <div className="mt-20 ml-24 flex gap-14 overflow-hidden max-w-[1350px] items-center justify-center">
                {movies.map((_, index) => (
                    <button key={index} onClick={() => setImageIndex(index)}>
                        <div
                            className={`${imageIndex === index ? '' : 'hover:scale-110'} ${imageIndex === index ? 'h-[120px]' : 'h-[100px]'} ${imageIndex === index ? 'w-[180px]' : 'w-[170px]'} rounded-xl`}
                            style={{ background: `url(${movies[index].imageUrl}) center/cover` }}
                        ></div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default MovieSlider;
