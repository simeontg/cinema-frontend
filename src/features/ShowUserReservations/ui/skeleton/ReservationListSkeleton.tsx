import { Skeleton } from "shared/ui";

const ReservationSkeleton = () => {
    return (
        <div className="md:w-1/2 w-full mb-6">
            <Skeleton variant="rectangular" width="100%" height={50} />
        </div>
    );
};

export const ReservationsListSkeleton = () => {
    return (
        <div className="mt-10 font-effra">
            <div className="flex flex-col justify-center items-center my-10">
                {[...Array(3)].map((_, idx) => (
                    <ReservationSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
};
