export const splitToRows = <T>(data: T[] | undefined, itemsPerRow: number): T[][] => {
    const result = [];
    if (data) {
        for (let i = 0; i < data.length; i += itemsPerRow) {
            result.push(data.slice(i, i + itemsPerRow));
        }
    }
    return result;
};
