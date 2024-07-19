import { FC } from 'react';

import { Projection } from './Projection';

export const ProjectionsList: FC = () => {
    return (
        <div className="mx-20 my-12 font-effra">
            <Projection
                city="Sofia"
                cinema="CineGrand"
                timeSlots={[
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM'
                ]}
            />
            <Projection
                city="Sofia"
                cinema="CineGrand"
                timeSlots={[
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM'
                ]}
            />
            <Projection
                city="Sofia"
                cinema="CineGrand"
                timeSlots={[
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM',
                    '10:45 AM'
                ]}
            />
        </div>
    );
};
