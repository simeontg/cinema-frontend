import { FC, useState } from 'react';

import { Session } from 'entities/session/model/types';
import { getPeriodOfDay } from 'shared/utils/getTimeOfDay';

import { transformSessionsToCinemasWithTimeSlots } from '../utils/transformSessionsToCinemasWithTimeslots';
import { Projection } from './Projection';
import { ProjectionFilters } from './ProjectionsFilters';

interface ProjectionListProps {
    sessions: Session[];
    activeDate: Date | null;
}

export const ProjectionsList: FC<ProjectionListProps> = ({ sessions, activeDate }) => {
    const [filters, setFilters] = useState({
        city: '',
        cinema: '',
        time: ''
    });

    const filteredSessions = sessions.filter(
        (s) => new Date(s.date).getTime() === activeDate?.getTime()
    );

    const timeSlotsByCinema = transformSessionsToCinemasWithTimeSlots(filteredSessions);

    return (
        <div className="mx-20 my-12 font-effra">
            <ProjectionFilters items={Object.entries(timeSlotsByCinema)} setFilters={setFilters} />
            {Object.entries(timeSlotsByCinema).map((timeSlotByCinema) => {
                const city = timeSlotByCinema[1].city;
                const cinema = timeSlotByCinema[0];
                const timeSlots = timeSlotByCinema[1].timeSlots.sort();

                const fitleredTimeSlots = filters.time
                    ? timeSlots.filter((timeslot) =>
                          getPeriodOfDay(timeslot).includes(filters.time)
                      )
                    : timeSlots;

                const isVisible =
                    (city.includes(filters.city) &&
                        cinema.includes(filters.cinema) &&
                        timeSlots.some((timeslot) =>
                            filters.time ? getPeriodOfDay(timeslot).includes(filters.time) : true
                        )) ||
                    filters.city === null ||
                    filters.cinema === null;

                return (
                    <Projection
                        key={cinema}
                        city={city}
                        cinema={cinema}
                        timeSlots={fitleredTimeSlots}
                        isVisible={isVisible}
                    />
                );
            })}
        </div>
    );
};
