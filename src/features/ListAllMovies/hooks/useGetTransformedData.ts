import { useEffect, useState } from 'react';

import { Movie } from 'entities/movie/model/types';
import useScreenSize from 'shared/hooks/useScreenSize';
import { PaginatedModel } from 'shared/types/model';
import { splitToRows } from 'shared/utils/splitToRows';

const useGetTransformedData = (data: PaginatedModel<Movie> | null) => {
    const [transformedData, setTransformedData] = useState<Movie[][] | undefined>(undefined);
    const { width } = useScreenSize();

    const items = data?.pages.reduce<Movie[]>((acc, current) => acc.concat(current.items), []);

    useEffect(() => {
        if (width >= 1100) {
            setTransformedData(splitToRows(items, 6));
            console.log(transformedData)
        } else if (width >= 700) {
            setTransformedData(splitToRows(items, 4));
        } else if (width >= 600) {
            setTransformedData(splitToRows(items, 3));
        } else {
            setTransformedData(splitToRows(items, 2));
        }
    }, [width, data]);

    return {
        transformedData
    };
};

export default useGetTransformedData;
