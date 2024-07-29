import { FC, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useGetMovie } from 'entities/movie/hooks/useGetMovie';
import { ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { DatesNav } from './DatesNav';
import { MovieHeader } from './MovieHeader';
import { ProjectionsList } from './ProjectionsList';

export const MovieBlock: FC = () => {
    const { id } = useParams();
    const { data: movie, isLoading, isError } = useGetMovie(id!);
    const [activeDate, setActiveDate] = useState<Date | null>(null);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const projectionDates: Date[] = [];

    movie.sessions.forEach((s) => {
        if (!projectionDates.some((d) => d.getTime() === new Date(s.date).getTime())) {
            projectionDates.push(new Date(s.date));
        }
    });

    return (
        <ErrorWrapper isError={isError}>
            <MovieHeader
                title={movie.title}
                description={movie.description}
                genre={movie.genre}
                imageUrl={movie.imageUrl}
                duration={movie.duration}
            />
            <DatesNav
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                dates={projectionDates.sort((a, b) => a.getTime() - b.getTime())}
            />
            <ProjectionsList activeDate={activeDate} sessions={movie.sessions} />
        </ErrorWrapper>
    );
};
