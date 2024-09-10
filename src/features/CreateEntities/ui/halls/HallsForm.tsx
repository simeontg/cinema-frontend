import { FC, useEffect, useState } from 'react';

import { InputLabel } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useGetCinemas } from 'entities/cinema/hooks/useGetCinemas';
import { useCreateHallMutation } from 'entities/hall/hooks/useCreateHall';
import { useGetHallPlan } from 'entities/hall/hooks/useGetHallPlan';
import { useUpdateHallMutation } from 'entities/hall/hooks/useUpdateHall';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Alert, Button, Dialog, MenuItem, Select, TextField } from 'shared/ui';

import { FormFields, Row, SelectedHall } from './types';
import { transformSeats } from './utils/transformHallPlantoForm';

interface MoviesFormProps {
    open: boolean;
    onClose: () => void;
    selectedHall: SelectedHall | null;
}

const defaultValues: FormFields = {
    cinemaId: '',
    hallName: '',
    hallPlan: []
};

export const HallsForm: FC<MoviesFormProps> = ({ open, onClose, selectedHall }) => {
    const { data: cinemas } = useGetCinemas();
    const { data: hallPlan } = useGetHallPlan(selectedHall?.id);
    const { mutate: createHall } = useCreateHallMutation();
    const { mutate: updateHall } = useUpdateHallMutation();

    const [mutationError, setMutationError] = useState('');
    const { width } = useScreenSize();
    const { t } = useTranslation('common');
    const queryClient = useQueryClient();

    const { handleSubmit, control, reset, setValue } = useForm<FormFields>({
        defaultValues,
        mode: 'onBlur'
    });

    const {
        fields: rowFields,
        append: appendRow,
        remove: removeRow,
        insert: insertRow,
        update: updateRow
    } = useFieldArray({
        control,
        name: 'hallPlan'
    });

    const onSubmit: SubmitHandler<FormFields> = async (values: FormFields) => {
        if (selectedHall) {
            updateHall(
                { id: selectedHall.id, ...values },
                {
                    onSuccess: (hall) => {
                        onClose();
                        queryClient.invalidateQueries({ queryKey: ['halls'] });
                        queryClient.invalidateQueries({ queryKey: ['hallPlan', hall.id] });
                    },
                    onError: (err) => {
                        setMutationError(err.response.data.message);
                    }
                }
            );
        } else {
            createHall(values, {
                onSuccess: (hall) => {
                    queryClient.invalidateQueries({ queryKey: ['halls'] });
                    queryClient.invalidateQueries({ queryKey: ['hallPlan', hall.id] });
                    onClose();
                },
                onError: (err) => {
                    setMutationError(err.response.data.message);
                }
            });
        }
    };

    useEffect(() => {
        if (selectedHall) {
            setValue('hallName', selectedHall.hall_name);
            setValue('cinemaId', selectedHall.cinema.id);
            console.log(selectedHall);
            if (hallPlan) {
                const transformedPlan = Object.entries(hallPlan).map(([row, seats]) => ({
                    rowIndex: Number(row),
                    seats: transformSeats(seats)
                }));
                setValue('hallPlan', transformedPlan);
            }
        } else {
            reset(defaultValues);
        }
    }, [selectedHall, hallPlan, setValue, reset]);

    const handleAddSeat = (rowIndex: number) => {
        const currentSeats = rowFields[rowIndex]?.seats || [];
        const totalSeatCount = currentSeats.reduce(
            (acc: number, seat: { seatCount: number }) => acc + seat.seatCount,
            0
        );
        const updatedSeats = [
            ...currentSeats,
            { seatType: 'regular', seatCount: Math.min(15 - totalSeatCount, 1) }
        ];
        updateRow(rowIndex, { ...rowFields[rowIndex], seats: updatedSeats });
    };

    const handleRemoveSeat = (rowIndex: number, seatIndex: number) => {
        const currentSeats = rowFields[rowIndex]?.seats || [];
        const updatedSeats = currentSeats.filter(
            (_: unknown, index: number) => index !== seatIndex
        );
        updateRow(rowIndex, { ...rowFields[rowIndex], seats: updatedSeats });
    };

    const handleAddRow = (index: number) => {
        const newRow: Row = {
            rowIndex: index,
            seats: [{ seatType: 'regular', seatCount: 1 }]
        };

        if (index < rowFields.length) {
            insertRow(index, newRow);
        } else {
            appendRow(newRow);
        }
    };

    const handleRemoveRow = (rowIndex: number) => {
        removeRow(rowIndex);
    };

    return (
        <Dialog
            fullScreen={width < MOBILE_SCREEN_WIDTH}
            onClose={() => {
                onClose();
                setMutationError('');
            }}
            open={open}
        >
            {mutationError && (
                <div className="m-auto mt-6">
                    <Alert className="max-w-[250px]" severity="error">
                        {mutationError}
                    </Alert>
                </div>
            )}
            <div className="font-effra md:p-20">
                <h1 className="mb-4 text-2xl">{selectedHall ? t('editHall') : t('createHall')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                        name="cinemaId"
                        control={control}
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
                                        cinemas.map((cinema) => (
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
                        name="hallName"
                        control={control}
                        rules={{ required: { value: true, message: 'Hall name is required' } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="text"
                                label={t('hallName')}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        {rowFields.map((row, rowIndex) => (
                            <div key={row.id} className="row-container">
                                <h4>
                                    {t('row')} {rowIndex + 1}
                                </h4>

                                <Controller
                                    control={control}
                                    name={`hallPlan.${rowIndex}.seats`}
                                    render={({ field }) => (
                                        <div>
                                            {field.value.map((seat: unknown, seatIndex: number) => (
                                                <div
                                                    key={seatIndex}
                                                    className="h-[40px] flex gap-2 mb-2"
                                                >
                                                    <Controller
                                                        control={control}
                                                        name={`hallPlan.${rowIndex}.seats.${seatIndex}.seatType`}
                                                        render={({
                                                            field: { onChange, onBlur, value }
                                                        }) => (
                                                            <Select
                                                                className="!w-1/2"
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                label="Seat Type"
                                                            >
                                                                <MenuItem value="VIP">
                                                                    {t('VIP')}
                                                                </MenuItem>
                                                                <MenuItem value="regular">
                                                                    {t('regular')}
                                                                </MenuItem>
                                                                <MenuItem value="couple">
                                                                    {t('couples')}
                                                                </MenuItem>
                                                            </Select>
                                                        )}
                                                    />
                                                    <Controller
                                                        control={control}
                                                        name={`hallPlan.${rowIndex}.seats.${seatIndex}.seatCount`}
                                                        render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                type="number"
                                                                value={field.value.toString()}
                                                                className="!w-1/2 !h-full"
                                                                label="Seat Count"
                                                            />
                                                        )}
                                                    />
                                                    <Button
                                                        className="!ml-2 !text-red-500"
                                                        onClick={() =>
                                                            handleRemoveSeat(rowIndex, seatIndex)
                                                        }
                                                    >
                                                        x
                                                    </Button>
                                                </div>
                                            ))}
                                            <div className="flex justify-between">
                                                <Button
                                                    variant="outlined"
                                                    className="!p-2 !text-white !bg-green-600 !pointer-events-auto !font-bold !text-sm"
                                                    onClick={() => handleAddSeat(rowIndex)}
                                                >
                                                    {t('addSeat')}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    className="!p-2 !text-white !bg-red-600 !pointer-events-auto !font-bold !text-sm"
                                                    onClick={() => handleRemoveRow(rowIndex)}
                                                >
                                                    {t('removeRow')}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    className="!p-2 !text-white !bg-blue-600 !pointer-events-auto !font-bold !text-sm"
                                                    onClick={() => handleAddRow(rowIndex + 1)}
                                                >
                                                    {t('insertRowBelow')}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        ))}
                        <Button
                            variant="outlined"
                            className="!border-2 !w-full hover:!border-[#6e3996] sm:w-96 !p-2 sm:!mr-2 !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !h-[40px] !text-sm !md:text-lg"
                            onClick={() => handleAddRow(rowFields.length)}
                        >
                            {t('addRowAtEnd')}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center lg:justify-start mt-6">
                        <Button
                            variant="outlined"
                            className="!border-2 hover:!border-[#6e3996] sm:w-96 !p-2 sm:!mr-2 !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !h-[40px] !text-sm !md:text-lg"
                            onClick={onClose}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            className="!p-2 sm:!ml-2 !bg-[#6e3996] sm:w-96 !pointer-events-auto !h-[40px] !text-sm !md:text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                        >
                            {selectedHall ? t('editHall') : t('createHall')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
