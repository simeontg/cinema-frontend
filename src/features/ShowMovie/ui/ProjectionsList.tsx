import { FC } from 'react';

import { Session } from 'entities/session/model/types';
import { transformSessionsToCinemasWithTimeSlots } from 'shared/utils/transformSessionsToCinemasWithTimeslots';

import { Projection } from './Projection';

interface ProjectionListProps {
    sessions: Session[];
    activeDate: Date | null;
}

export const ProjectionsList: FC<ProjectionListProps> = ({ sessions, activeDate }) => {
    const filteredSessions = sessions.filter(
        (s) => new Date(s.date).getTime() === activeDate?.getTime()
    );
    const timeSlotsByCinema = transformSessionsToCinemasWithTimeSlots(filteredSessions);

    return (
        <div className="mx-20 my-12 font-effra">
            {Object.entries(timeSlotsByCinema).map((timeSlotByCinema) => (
                <Projection
                    key={timeSlotByCinema[0]}
                    city={timeSlotByCinema[1].city}
                    cinema={timeSlotByCinema[0]}
                    timeSlots={timeSlotByCinema[1].timeSlots.sort()}
                />
            ))}
        </div>
    );
};
