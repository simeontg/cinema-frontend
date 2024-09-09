import { FC } from 'react';
import { Skeleton } from 'shared/ui';

export const TrendingMoviesSkeleton: FC = () => {
    return (
        <div className="max-w-[1550px] bg-gray-200 hidden md:block h-[600px]">
            <section
                className="w-full h-full relative"
                style={{
                    background: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 100%)`
                }}
            >
                <div className="pointer-events-none mt-20 ml-20 inline-block w-[600px] h-[300px]">
                    <Skeleton variant="text" width={400} height={60} />
                    <Skeleton variant="text" width={100} height={30} className="mt-4" />
                    <div className="flex gap-2 mt-4">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={60} height={30} className="font-effra" />
                    </div>
                    <div className="mt-4 w-96">
                        <Skeleton variant="rectangular" height={100} />
                    </div>
                    <Skeleton
                        variant="rectangular"
                        width={220}
                        height={50}
                        className="!p-6 !mt-6 !pointer-events-auto !rounded-full"
                    />
                </div>
                <div
                    className="block absolute p4 left-5 h-7 w-7 top-1/2"
                ></div>
                <div
                    className="block absolute p4 right-5 h-7 w-7 top-1/2"
                ></div>
                <div className="mt-20 ml-24 flex gap-14 overflow-hidden max-w-[1350px] items-center justify-center">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={180}
                                height={120}
                                className="rounded-xl"
                            />
                        ))}
                </div>
            </section>
        </div>
    );
};
