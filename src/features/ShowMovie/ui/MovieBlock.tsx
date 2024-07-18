import { FC } from 'react';

import { DatesNav } from './DatesNav';
import { MovieHeader } from './MovieHeader';
import { ProjectionsList } from './ProjectionsList';

export const MovieBlock: FC = () => {
    return (
        <>
            <MovieHeader />
            <DatesNav
                dates={[
                    new Date('2024-11-12'),
                    new Date('2024-11-13'),
                    new Date('2024-11-14'),
                    new Date('2024-11-15'),
                    new Date('2024-11-16'),
                    new Date('2024-11-17'),
                    new Date('2024-11-18'),
                    new Date('2024-11-19')
                ]}
            />
            <ProjectionsList />
        </>
    );
};
