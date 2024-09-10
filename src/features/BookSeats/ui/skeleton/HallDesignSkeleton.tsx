import { FC } from 'react';

import { Skeleton } from 'shared/ui';

export const HallDesignSkeleton: FC = () => {
    return (
        <div className="w-full lg:w-2/3 flex-grow-0 flex-shrink-0 mb-12 md:mb-0 overflow-auto h-[700px]">
            <div className="w-full">
                <Skeleton variant="rectangular" width="100%" height={300} className="mb-16" />
                <div className="flex gap-12 items-center flex-col">
                    {[...Array(5)].map((_, rowIdx) => (
                        <div className="flex gap-4 md:gap-12 items-center" key={rowIdx}>
                            <Skeleton variant="text" width={40} className="opacity-40 text-sm" />
                            <div className="flex gap-2">
                                {[...Array(10)].map((_, seatIdx) => (
                                    <Skeleton
                                        key={seatIdx}
                                        variant="circular"
                                        width={40}
                                        height={40}
                                    />
                                ))}
                            </div>
                            <Skeleton variant="text" width={40} className="opacity-40 text-sm" />
                        </div>
                    ))}
                </div>
                <Skeleton variant="rectangular" width="100%" height={50} className="mt-12" />
            </div>
        </div>
    );
};
