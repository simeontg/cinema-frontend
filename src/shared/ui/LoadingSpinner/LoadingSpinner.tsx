import { FC } from 'react';

import { CircularProgress } from '@mui/material';

export const LoadingSpinner: FC = () => {
    return (
        <div className="flex justify-center my-16">
            <CircularProgress />
        </div>
    );
};
