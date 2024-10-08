import { FC, useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from 'react-router-dom';

import { TrendedMovie } from 'entities/movie/model/types';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button } from 'shared/ui';
import { generateMovieRoute } from 'shared/utils/routesUtils';

interface MovieSliderProps {
    movies: TrendedMovie[];
}

const descriptionParagraphStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical' as const
};

const MovieSlider: FC<MovieSliderProps> = ({ movies }) => {
    const { t } = useTranslation('common');
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex((index) => (index === movies.length - 1 ? 0 : index + 1));
    };

    const showPreviousImage = () => {
        setImageIndex((index) => (index === 0 ? movies.length - 1 : index - 1));
    };

    if (movies.length === 0) {
        return <></>;
    }

    return (
        <section
            className="w-full h-full relative"
            style={{
                background: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 100%), url(${movies[imageIndex].imageUrl}) center/cover`
            }}
        >
            <div className="pointer-events-none mt-20 ml-20 inline-block w-[700px] h-[300px]">
                <h1 className="text-6xl font-effra font-bold">{movies[imageIndex].title}</h1>
                <p className="mt-4">{movies[imageIndex].genre.toUpperCase()}</p>
                <div className="flex gap-2 mt-4">
                    <ScheduleIcon />
                    <p className="font-effra">{movies[imageIndex].duration} MIN</p>
                </div>
                <div className="mt-4 max-h-[103px] max-w-96">
                    <p
                        className="font-effra overflow-hidden text-ellipsis"
                        style={descriptionParagraphStyle}
                    >
                        {movies[imageIndex].description}
                    </p>
                </div>
                <Link to={generateMovieRoute(movies[imageIndex].id)}>
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
