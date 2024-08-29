import { FC, useEffect } from 'react';

import { InputLabel } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useMovieMutation } from 'entities/movie/hooks/useCreateOrUpdateMovieMutation';
import { MOVIE_GENRES } from 'shared/constants/movieGenres';
import { MAX_IMAGE_SIZE } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import {
    Alert,
    Button,
    Checkbox,
    Dialog,
    LoadingSpinner,
    MenuItem,
    Select,
    TextField
} from 'shared/ui';

import { FormFields, SelectedMovie } from './types';

interface MoviesFormProps {
    open: boolean;
    onClose: () => void;
    afterClose: () => void;
    selectedMovie: SelectedMovie | null;
}

const defaultValues: FormFields = {
    title: '',
    description: '',
    duration: '',
    image: null,
    genre: '',
    releaseDate: '',
    trended: false
};

export const MoviesForm: FC<MoviesFormProps> = ({ open, onClose, selectedMovie, afterClose }) => {
    const { mutate: createOrUpdateMovieMutation, isPending, isError, error } = useMovieMutation();
    const queryClient = useQueryClient();
    const { t } = useTranslation('common');

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues,
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormFields> = async ({
        title,
        description,
        genre,
        image,
        releaseDate,
        duration,
        trended
    }) => {
        createOrUpdateMovieMutation(
            {
                title,
                description,
                genre,
                image,
                releaseDate,
                duration,
                trended,
                movieId: selectedMovie?.id
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['paginatedMovies'] });
                    reset(defaultValues);
                    onClose();
                }
            }
        );
    };

    useEffect(() => {
        if (selectedMovie) {
            setValue('title', selectedMovie.title);
            setValue('description', selectedMovie.description);
            setValue('duration', selectedMovie.duration.toString());
            setValue('genre', selectedMovie.genre);
            setValue('releaseDate', selectedMovie.releaseDate.split('T')[0]);
            setValue('trended', selectedMovie.trended);
        } else {
            reset(defaultValues);
        }
    }, [selectedMovie]);

    if (isPending) {
        return (
            <Dialog onClose={onClose} open={open}>
                <div className="flex justify-center items-center p-20">
                    <LoadingSpinner />
                    <span className="ml-4">{t('pleaseWait')}</span>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog afterClose={afterClose} onClose={onClose} open={open}>
            {isError && (
                <div className="m-auto mt-6">
                    <Alert className="max-w-[250px]" severity="error">
                        {error.message}
                    </Alert>
                </div>
            )}
            <div className="font-effra p-20">
                <h1 className="mb-4 text-2xl">
                    {selectedMovie ? t('editMovie') : t('createMovie')}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                        key="title"
                        control={control}
                        name="title"
                        rules={{ required: { value: true, message: t('titleRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="text"
                                label={t('title')}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        key="description"
                        control={control}
                        name="description"
                        rules={{ required: { value: true, message: t('descriptionRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="text"
                                label={t('description')}
                                onChange={onChange}
                                onBlur={onBlur}
                                multiline={true}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        key="duration"
                        control={control}
                        name="duration"
                        rules={{ required: { value: true, message: t('durationRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="number"
                                label={t('durationInMinutes')}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        key="image"
                        control={control}
                        name="image"
                        rules={{
                            required: {
                                value: selectedMovie ? false : true,
                                message: t('imageRequired')
                            },
                            validate: {
                                fileType: (value) => {
                                    if (!selectedMovie || (selectedMovie && value)) {
                                        return value?.type.startsWith('image/') || t('fileMustBeAnImage');
                                    }
                                    return true;
                                },
                                fileSize: (value) => {
                                    if (!selectedMovie || (selectedMovie && value)) {
                                        return (value && value.size < MAX_IMAGE_SIZE) || t('fileTooLarge');
                                    }
                                    return true;
                                }
                            }
                        }}
                        render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                            <TextField
                                type="file"
                                onChange={(e) => onChange(e.target.files?.[0] || null)}
                                shrinkLabel={true}
                                label={t('image')}
                                onBlur={onBlur}
                                inputPadding="12px"
                                error={!!error}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        key="genre"
                        control={control}
                        name="genre"
                        rules={{ required: { value: true, message: t('genreRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <div className="w-full">
                                <InputLabel>
                                    <p className="text-xs ml-3">{t('genre')}</p>
                                </InputLabel>
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className="!w-full"
                                    label={t('genre')}
                                >
                                    {MOVIE_GENRES.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <p className="text-sm text-[#d32f2f] pl-4">{error?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        key="releaseDate"
                        control={control}
                        name="releaseDate"
                        rules={{ required: { value: true, message: t('releaseDateRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="date"
                                label={t('releaseDate')}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={!!error}
                                inputPadding="12px"
                                shrinkLabel={true}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        key="trended"
                        control={control}
                        name="trended"
                        render={({ field: { onChange, value } }) => (
                            <div className="flex items-center">
                                <InputLabel>{t('trended')}</InputLabel>
                                <Checkbox
                                    onChange={(e) => onChange(e.target.checked)}
                                    checked={value}
                                />
                            </div>
                        )}
                    />
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start mt-6">
                        <Button
                            variant="outlined"
                            className="!border-2 hover:!border-[#6e3996] !p-2 !mr-2 !w-[140px] md:!w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !h-[40px] !text-sm !md:text-lg"
                            onClick={onClose}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            className="!p-2 !ml-2 !w-[140px] md:!w-[220px] !bg-[#6e3996] !pointer-events-auto !h-[40px] !text-sm !md:text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                        >
                            {selectedMovie ? t('editMovie') : t('createMovie')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
