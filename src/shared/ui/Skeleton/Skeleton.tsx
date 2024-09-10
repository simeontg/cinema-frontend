import { FC } from 'react';

import { Skeleton as MaterialSkeleton } from '@mui/material';

interface SkeletonProps {
    variant: 'rectangular' | 'circular' | 'text';
    width?: string | number;
    height?: string | number;
    className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ variant, width, height, className }) => {
    return (
        <MaterialSkeleton
            className={className}
            width={width}
            height={height}
            variant={variant}
        ></MaterialSkeleton>
    );
};
