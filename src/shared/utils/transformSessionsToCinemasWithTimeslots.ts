import { Session } from "entities/session/model/types";

interface CinemaWithTimeslots {
    [cinemaName: string]: {
      timeSlots: string[];
      city: string;
    };
  }

export const transformSessionsToCinemasWithTimeSlots = (sessions: Session[]): CinemaWithTimeslots => {
    const obj: CinemaWithTimeslots = {};

    sessions.forEach(session => {
        if (!obj[session.cinema.name]) {
            obj[session.cinema.name] = {
                timeSlots: [session.time],
                city: session.cinema.city.name
            }
        } else {
            obj[session.cinema.name].timeSlots.push(session.time)
        }
    })

    return obj;
}