import { FC } from 'react';

import CameraRollIcon from '@mui/icons-material/CameraRoll';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import { Movie } from 'entities/movie/model/types';
import { MOVIE_GENRES } from 'shared/constants/movieGenres';
import { useTranslation } from 'shared/hooks/i18nHook';
import { PaginatedModel } from 'shared/types/model';
import { Autocomplete, TextField } from 'shared/ui';

import { Filters } from '../types';

interface MovieFiltersProps {
    data: PaginatedModel<Movie> | null;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const MovieFilters: FC<MovieFiltersProps> = ({ data, setFilters }) => {
    const { t } = useTranslation('main');

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
        <div className="p-5 flex gap-10 flex-wrap mt-5 mb-8 pl-10 max-w-[1400px]">
            <div className="flex gap-4 items-center">
                <OndemandVideoIcon />
                <Autocomplete
                    className="w-64"
                    options={data?.pages[0].items.map((item) => item.title) || []}
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
