const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const mapMonthToLetter = (month: number) => {
    return months[month];
};

export const mapDayToLetter = (day: number) => {
    return days[day-1];
};
