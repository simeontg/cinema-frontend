import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { useGetSession } from 'entities/session/hooks/useGetSession';
import { ErrorWrapper, LoadingSpinner } from 'shared/ui';

import { HallDesign } from './HallDesign';
import { OrderInformation } from './OrderInformation';

export const BookSeatsBlock: FC = () => {
    const { id } = useParams();

    const { data: session, isError, isLoading } = useGetSession(id!);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorWrapper isError={isError}>
            <div className="font-effra lg:px-20 flex flex-col lg:flex-row w-full">
                <HallDesign hallId={session.hall.id}/>
                <OrderInformation
                    movieTitle={session.movie.title}
                    cinema={session.cinema.name}
                    date={session.date}
                    time={session.time}
                    city={session.cinema.city.name}
                />
            </div>
        </ErrorWrapper>
    );
};
