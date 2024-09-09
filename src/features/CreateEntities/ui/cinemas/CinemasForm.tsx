import { FC, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useCreateCinemaMutation } from 'entities/cinema/hooks/useCreateCinema';
import { MOBILE_SCREEN_WIDTH } from 'shared/constants/utils';
import { useTranslation } from 'shared/hooks/i18nHook';
import useScreenSize from 'shared/hooks/useScreenSize';
import { Alert, Button, Dialog, LoadingSpinner, TextField } from 'shared/ui';

import { FormFields, SelectedCinema } from './types';
import { useUpdateCinemaMitation } from 'entities/cinema/hooks/useUpdateCinema';
import { UpdateCinemaDto } from 'entities/cinema/api/types';

interface MoviesFormProps {
    open: boolean;
    onClose: () => void;
    afterClose: () => void;
    selectedCinema: SelectedCinema | null;
}

const defaultValues: FormFields = {
    name: '',
    city: ''
};

export const CinemasForm: FC<MoviesFormProps> = ({ open, onClose, selectedCinema, afterClose }) => {
    const { mutate: createCinema, isPending } = useCreateCinemaMutation();
    const { mutate: updateCinema, isPending: isUpdateCinemaPending } = useUpdateCinemaMitation();
    const [mutationError, setMutationError] = useState('');
    const queryClient = useQueryClient();
    const { width } = useScreenSize();
    const { t } = useTranslation('common');

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues,
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormFields> = async (values: FormFields) => {
        if (selectedCinema) {
            updateCinema({ ...values, id: selectedCinema.id } as UpdateCinemaDto, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['cinemas'] });
                    reset(defaultValues);
                    onClose();
                },
                onError: (err) => {
                    setMutationError(err.response.data.message);
                }
            });
        } else {
            createCinema(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['cinemas'] });
                    reset(defaultValues);
                    onClose();
                },
                onError: (err) => {
                    setMutationError(err.response.data.message);
                }
            });
        }
    };

    useEffect(() => {
        if (selectedCinema) {
            setValue('name', selectedCinema.name);
            setValue('city', selectedCinema.city.name);
        } else {
            reset(defaultValues);
        }
    }, [selectedCinema]);

    if (isPending || isUpdateCinemaPending) {
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
                    {selectedCinema ? t('editCinema') : t('createCinema')}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                        key="title"
                        control={control}
                        name="name"
                        rules={{ required: { value: true, message: 'Name required' } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="text"
                                label={t('name')}
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
                        name="city"
                        rules={{ required: { value: true, message: 'City required' } }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextField
                                type="text"
                                label={t('city')}
                                onChange={onChange}
                                onBlur={onBlur}
                                multiline={true}
                                error={!!error}
                                value={value}
                                helperText={error?.message || ''}
                            />
                        )}
                    />
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
                            {selectedCinema ? t('editCinema') : t('createCinema')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
