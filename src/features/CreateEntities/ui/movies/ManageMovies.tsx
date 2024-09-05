import { FC, useState } from 'react';

import clsx from 'clsx';

import { useGetPaginatedMovies } from 'entities/movie/hooks/useGetPaginatedMovies/useGetPaginatedMovies';
import { Movie } from 'entities/movie/model/types';
import { useTranslation } from 'shared/hooks/i18nHook';
import { Button, ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { MovieCard } from './MovieCard';
import { MoviesForm } from './MoviesForm';
import { SelectedMovie } from './types';

export const ManageMovies: FC = () => {
    const { t } = useTranslation('common');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | null>(null);

    const onClose = () => {
        setIsFormOpen(false);
    };

    const afterClose = () => {
        setSelectedMovie(null);
    };

    const onEditClick = (movie: Movie) => {
        setSelectedMovie({
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            duration: movie.duration,
            releaseDate: movie.releaseDate.toString(),
            trended: movie.trended,
            id: movie.id
        });
        setIsFormOpen(true);
    };

    const {
        data: movies,
        fetchNextPage,
        isError,
        isFetchingNextPage,
        hasNextPage
    } = useGetPaginatedMovies('all', 5, { title: '', genre: '' });

    if (isFetchingNextPage) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="flex flex-col items-center md:items-start">
                <Button
                    className="!mb-12 !bg-[#6e3996] !w-40 !text-white !border-black border-2 !px-4 !py-2 !mt-8"
                    onClick={() => setIsFormOpen(true)}
                >
                    {t('createMovie')}
                </Button>
                <MoviesForm
                    afterClose={afterClose}
                    selectedMovie={selectedMovie}
                    onClose={onClose}
                    open={isFormOpen}
                />
                <h1 className="text-2xl mb-4">{t('listOfMovies')}</h1>
                <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-4">
                    {movies?.pages.map((page) => {
                        return page.items.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                onEditClick={() => onEditClick(movie)}
                                title={movie.title}
                                imageUrl={movie.imageUrl}
                            />
                        ));
                    })}
                </div>
                <Button
                    className={clsx(
                        'hover:!bg-[#6e3996] hover:!text-white hover:!border-[#6e3996] !rounded-[13px] !mb-4 !px-8 !py-2.5 !m-auto !mt-8 text-[13px]',
                        hasNextPage ? '!block' : '!hidden'
                    )}
                    onClick={() => fetchNextPage()}
                    variant="outlined"
                >
                    {t('loadMore')}
                </Button>
            </div>
        </ErrorWrapper>
    );
};
