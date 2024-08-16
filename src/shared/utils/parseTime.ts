// Convert time string like 11:00 AM to Date object for comparison
export const parseTime = (timeString: string): Date => {
    const [time, modifier] = timeString.split(/(AM|PM)/);
    const [hours, minutes] = time.split(':');
    let hoursNumber = parseInt(hours, 10);

    if (hoursNumber === 12) {
        hoursNumber = 0;
    }
    if (modifier === 'PM') {
        hoursNumber += 12;
    }

    return new Date(`1970-01-01T${hoursNumber.toString().padStart(2, '0')}:${minutes}:00`);
};
