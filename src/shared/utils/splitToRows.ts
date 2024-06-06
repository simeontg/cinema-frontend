export const splitToRows = <T>(data: T[], itemsPerRow: number): T[][] => {
    const result = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
        result.push(data.slice(i, i + itemsPerRow));
    }
    return result;
};
