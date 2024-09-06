import { FC, useEffect, useState } from 'react';

import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { FormControl, InputLabel } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

import { useGetCinemas } from 'entities/cinema/hooks/useGetCinemas';
import { useGetHallSeatTypes } from 'entities/hall/hooks/useGetHallSeatTypes';
import { Movie } from 'entities/movie/model/types';
import { CreateSessionDto, UpdateSessionDto } from 'entities/session/api/types';
import { useCreateSessionMutation } from 'entities/session/hooks/useCreateSession';
import { useUpdateSessionMutation } from 'entities/session/hooks/useUpdateSession';
import { Session } from 'entities/session/model/types';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Alert, Button, Dialog, LoadingSpinner, MenuItem, Select, TextField } from 'shared/ui';

import { FormFields } from './types';

interface SessionProps {
    movies: Movie[] | undefined;
    open: boolean;
    onClose: () => void;
    afterClose?: () => void;
    selectedSession: Session | null;
}

const defaultValues: FormFields = {
    movie: '',
    cinema: '',
    hall: '',
    date: '',
    time: '',
    seatPrices: {}
};

export const SessionsForm: FC<SessionProps> = ({
    movies,
    open,
    onClose,
    afterClose,
    selectedSession
}) => {
    const queryClient = useQueryClient();
    const { data: cinemas } = useGetCinemas();
    const { mutate: createSessionMutation, isPending: isCreateSessionPending } =
        useCreateSessionMutation();
    const { mutate: updateSessionMutation, isPending: isUpdateSessionPending } =
        useUpdateSessionMutation();
    const [mutationError, setMutationError] = useState('');
    const { t } = useTranslation('common');
    const { width } = useScreenSize();

    const { handleSubmit, control, reset, setValue, watch } = useForm({
        defaultValues,
        mode: 'onBlur'
    });

    const onSubmit = (values: CreateSessionDto | UpdateSessionDto) => {
        if (selectedSession) {
            updateSessionMutation({ ...values, id: selectedSession.id } as UpdateSessionDto, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['sessions', values.movie] });
                    reset(defaultValues);
                    onClose();
                },
                onError: (err) => {
                    setMutationError(err.response.data.message);
                }
            });
        } else {
            createSessionMutation(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['sessions', values.movie] });
                    reset(defaultValues);
                    onClose();
                },
                onError: (err) => {
                    setMutationError(err.response.data.message);
                }
            });
        }
    };

    const cinemaValue = watch('cinema');
    const hallValue = watch('hall');
    const { data: seatTypes } = useGetHallSeatTypes(hallValue);

    useEffect(() => {
        if (selectedSession) {
            setValue('movie', selectedSession.movie.id);
            setValue('cinema', selectedSession.cinema.id);
            setValue('hall', selectedSession.hall.id);
            setValue('time', selectedSession.startTime);
            setValue('date', selectedSession.date);
            if (selectedSession.seatPrices) {
                Object.keys(selectedSession.seatPrices).forEach((seatType) => {
                    setValue(`seatPrices.${seatType}`, selectedSession.seatPrices[seatType]);
                });
            }
        } else {
            reset(defaultValues);
        }
    }, [selectedSession]);

    useEffect(() => {
        if (!open) {
            reset(defaultValues, { keepErrors: false });
            setMutationError('');
        }
    }, [open]);

    if (isCreateSessionPending || isUpdateSessionPending) {
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
        <Dialog
            fullScreen={width < MOBILE_SCREEN_WIDTH}
            afterClose={afterClose}
            onClose={onClose}
            open={open}
        >
            {mutationError && (
                <div className="m-auto mt-6">
                    <Alert className="max-w-[250px]" severity="error">
                        {mutationError}
                    </Alert>
                </div>
            )}
            <div className="font-effra p-20">
                <h1 className="mb-4 text-2xl">
                    {selectedSession ? t('editSession') : t('createSession')}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                        key="movie"
                        control={control}
                        name="movie"
                        rules={{ required: { value: true, message: t('movieRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <div className="w-full">
                                <InputLabel>
                                    <p className="text-xs ml-3">{t('movie')}</p>
                                </InputLabel>
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className="!w-full"
                                >
                                    {movies &&
                                        movies.map((movie) => (
                                            <MenuItem key={movie.id} value={movie.id}>
                                                {movie.title}
                                            </MenuItem>
                                        ))}
                                </Select>
                                <p className="text-sm text-[#d32f2f] pl-4">{error?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        key="cinema"
                        control={control}
                        name="cinema"
                        rules={{ required: { value: true, message: t('cinemaRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <div className="w-full">
                                <InputLabel>
                                    <p className="text-xs ml-3">{t('cinema')}</p>
                                </InputLabel>
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    className="!w-full"
                                >
                                    {cinemas &&
                                        cinemas?.map((cinema) => (
                                            <MenuItem key={cinema.id} value={cinema.id}>
                                                {cinema.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                                <p className="text-sm text-[#d32f2f] pl-4">{error?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        key="hall"
                        control={control}
                        name="hall"
                        rules={{ required: { value: true, message: t('hallRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <div className="w-full">
                                <InputLabel>
                                    <p className="text-xs ml-3">{t('hall')}</p>
                                </InputLabel>
                                <FormControl fullWidth disabled={!cinemaValue}>
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        className="!w-full"
                                    >
                                        {cinemaValue !== '' &&
                                            cinemas
                                                ?.find((c) => c.id === cinemaValue)
                                                ?.halls?.map((hall) => (
                                                    <MenuItem key={hall.id} value={hall.id}>
                                                        {hall.hall_name}
                                                    </MenuItem>
                                                ))}
                                    </Select>
                                </FormControl>
                                <p className="text-sm text-[#d32f2f] pl-4">{error?.message}</p>
                            </div>
                        )}
                    />
                    {seatTypes &&
                        seatTypes.map((seatType) => (
                            <Controller
                                key={seatType}
                                control={control}
                                name={`seatPrices.${seatType}` as `seatPrices.${string}`} // Type assertion
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error }
                                }) => (
                                    <div className="w-full">
                                        <InputLabel>
                                            <p className="text-xs ml-3">{seatType} seat price</p>
                                        </InputLabel>
                                        <TextField
                                            type="number"
                                            className="w-full"
                                            label={t(seatType)}
                                            onChange={onChange}
                                            icon={<AttachMoneyOutlinedIcon />}
                                            onBlur={onBlur}
                                            value={value || ''}
                                            error={!!error}
                                            inputPadding="12px"
                                            shrinkLabel={true}
                                            helperText={error?.message || ''}
                                        />
                                    </div>
                                )}
                            />
                        ))}
                    <Controller
                        key="date"
                        control={control}
                        name="date"
                        rules={{ required: { value: true, message: t('dateRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="date"
                                label={t('date')}
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
                        key="time"
                        control={control}
                        name="time"
                        rules={{ required: { value: true, message: t('timeRequired') } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="time"
                                label={t('time')}
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
                    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center lg:justify-start mt-6">
                        <Button
                            variant="outlined"
                            className="!border-2 hover:!border-[#6e3996] sm:!w-96 !p-2 sm:!mr-2 !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !h-[40px] !text-sm !md:text-lg"
                            onClick={onClose}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            className="!p-2 sm:!ml-2 sm:!w-96 !bg-[#6e3996] !pointer-events-auto !h-[40px] !text-sm !md:text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                        >
                            {selectedSession ? t('editSession') : t('createSession')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
