import { FC } from 'react';

import CameraRollIcon from '@mui/icons-material/CameraRoll';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import { MovieReleaseType } from 'entities/movie/hooks/useGetPaginatedMovies/types';
import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { MOVIE_GENRES } from 'shared/constants/movieGenres';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Autocomplete, TextField } from 'shared/ui';

import { Filters } from '../types';

interface MovieFiltersProps {
    type: MovieReleaseType;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const MovieFilters: FC<MovieFiltersProps> = ({ type, setFilters }) => {
    const { t } = useTranslation('main');

    const { data: movies } = useGetPaginatedMovies(type, 100, { title: '', genre: '' });
    const onTitleChange = (e: React.SyntheticEvent, value: string) => {
        setFilters((prevState: Filters) => ({
            ...prevState,
            title: value
        }));
    };

    const onGenreChange = (e: React.SyntheticEvent, value: string) => {
        setFilters((prevState: Filters) => ({
            ...prevState,
            genre: value
        }));
    };

    return (
        <div className="p-5 flex gap-10 flex-col md:flex-row items-center mt-5 mb-8 w-full">
            <div className="flex gap-4 items-center">
                <OndemandVideoIcon />
                <Autocomplete
                    className="w-64"
                    options={movies?.pages[0].items.map((movie) => movie.title) || []}
                    onChange={onTitleChange}
                    renderInput={(params) => <TextField {...params} label={t('moviesFilter')} />}
                />
            </div>
            <div className="flex gap-4 items-center">
                <CameraRollIcon />
                <Autocomplete
                    onChange={onGenreChange}
                    className="w-64"
                    options={MOVIE_GENRES}
                    renderInput={(params) => <TextField {...params} label={t('genreFilter')} />}
                />
            </div>
        </div>
    );
};
