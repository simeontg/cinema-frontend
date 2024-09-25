import { FC, useRef, useState } from 'react';

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
    const projectionsRef = useRef<HTMLDivElement>(null);

    const scrollToProjections = () => {
        if (projectionsRef.current) {
            projectionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const projectionDates: Date[] = [];
    if (isError || !movie) {
        return <ErrorWrapper isError={true} />;
    }

    movie.sessions
        .filter((s) => {
            const today = new Date();
            const sDate = new Date(`${s.date}T${s.startTime}`);
            return sDate.getTime() >= today.getTime();
        })
        .forEach((s) => {
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
                onBookNowClick={scrollToProjections}
                duration={movie.duration}
            />
            <div ref={projectionsRef}>
                <DatesNav
                    activeDate={activeDate}
                    setActiveDate={setActiveDate}
                    dates={projectionDates.sort((a, b) => a.getTime() - b.getTime())}
                />
            </div>
            <ProjectionsList
                activeDate={activeDate}
                sessions={movie.sessions.filter((s) => {
                    const dateTimeString = `${s.date}T${s.startTime}`;
                    return new Date(dateTimeString).getTime() > new Date().getTime();
                })}
            />
        </ErrorWrapper>
    );
};
