import { FC } from 'react';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';

import { useTranslation } from 'shared/hooks/i18nHook';
import { Autocomplete, TextField } from 'shared/ui';

import { Filters } from '../types';

interface ProjectionFiltersProps {
    items: Array<[string, { timeSlots: string[]; city: string }]>;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const ProjectionFilters: FC<ProjectionFiltersProps> = ({ items, setFilters }) => {
    const { t } = useTranslation('common');

    const onCityChange = (e: React.SyntheticEvent, value: string) => {
        setFilters((prevState: Filters) => ({
            ...prevState,
            city: value
        }));
    };

    const onCinemaChange = (e: React.SyntheticEvent, value: string) => {
        setFilters((prevState: Filters) => ({
            ...prevState,
            cinema: value
        }));
    };

    const onTimeChange = (e: React.SyntheticEvent, value: string) => {
        setFilters((prevState: Filters) => ({
            ...prevState,
            time: value
        }));
    };
    return (
        <div className="flex flex-col md:flex-row items-center ml-10 gap-8 mb-6">
            <div className="flex gap-2 items-center">
                <FmdGoodOutlinedIcon />
                <Autocomplete
                    className="w-64"
                    options={
                        Array.from(
                            new Set(items.map((timeslotByCinema) => timeslotByCinema[1].city))
                        ) || []
                    }
                    renderInput={(params) => <TextField {...params} label={t('city')} />}
                    onChange={onCityChange}
                />
            </div>
            <div className="flex gap-2 items-center">
                <MovieCreationOutlinedIcon />
                <Autocomplete
                    className="w-64"
                    options={items.map((timeslotByCinema) => timeslotByCinema[0]) || []}
                    renderInput={(params) => <TextField {...params} label={t('cinema')} />}
                    onChange={onCinemaChange}
                />
            </div>
            <div className="flex gap-2 items-center">
                <AccessTimeOutlinedIcon />
                <Autocomplete
                    className="w-64"
                    options={[t('morning'),t('afternoon'),t('evening')]}
                    renderInput={(params) => <TextField {...params} label={t('timeslot')} />}
                    onChange={onTimeChange}
                />
            </div>
        </div>
    );
};