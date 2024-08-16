import { Session } from 'entities/session/model/types';

interface CinemaWithTimeslots {
    [cinemaName: string]: {
        timeSlots: Record<string, string>[];
        city: string;
    };
}

export const transformSessionsToCinemasWithTimeSlots = (
    sessions: Session[]
): CinemaWithTimeslots => {
    const obj: CinemaWithTimeslots = {};

    sessions.forEach((session) => {
        if (!obj[session.cinema.name]) {
            obj[session.cinema.name] = {
                timeSlots: [{ time: session.time, id: session.id }],
                city: session.cinema.city.name
            };
        } else {
            obj[session.cinema.name].timeSlots.push({ time: session.time, id: session.id });
        }
    });

    return obj;
};
