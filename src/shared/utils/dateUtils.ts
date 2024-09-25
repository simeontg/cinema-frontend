const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const mapMonthToLetter = (month: number) => {
    return months[month];
};

export const mapDayToLetter = (day: number) => {
    return days[day];
};
