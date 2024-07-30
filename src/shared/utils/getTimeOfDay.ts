export const getPeriodOfDay = (timeStr: string): string[] => {
    const hour = Number(timeStr.split(':')[0]);

    if (hour >= 8 && hour < 12) {
        return ['Morning', 'Сутрин'];
    } else if (hour >= 12 && hour < 17) {
        return ['Afternoon', 'Следобед'];
    } else {
        return ['Evening', 'Вечер'];
    }
};
