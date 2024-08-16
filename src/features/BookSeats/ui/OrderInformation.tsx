import { FC, useState } from 'react';

import { Button } from 'shared/ui';

import { ChosenSeats } from './ChosenSeats';
import { ConfirmationDialog } from './ConfirmationDialog';
import { SessionInformation } from './SessionInformation';

interface OrderInformationProps {
    movieTitle: string;
    city: string;
    cinema: string;
    date: Date;
    time: string;
    seats?: string[];
}

export const OrderInformation: FC<OrderInformationProps> = ({
    movieTitle,
    cinema,
    city,
    date,
    time
}) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    return (
        <div className="w-full lg:w-1/3 flex-grow-0 flex-shrink-0 bg-gray-100 h-[750px]">
            <p className="text-3xl font-bold ml-6 my-6">Your order</p>
            <ChosenSeats seats={[]} />
            <SessionInformation
                movieTitle={movieTitle}
                cinema={cinema}
                date={date}
                time={time}
                city={city}
            />
            <div className="text-xl flex justify-between mx-6 mt-12">
                <p>Order total</p>
                <p>$0.00</p>
            </div>
            <div className="flex justify-center lg:justify-start gap-5 px-4 mt-32">
                <Button
                    variant="outlined"
                    className="!border-2 hover:!border-[#6e3996] !p-6 !mt-6 !w-[220px] !text-[#6e3996] !bg-transparent hover:!bg-white !pointer-events-auto !rounded-full !h-[50px] !text-lg"
                >
                    Back
                </Button>
                <Button
                    variant="outlined"
                    className="!p-6 !mt-6 !w-[220px] !bg-[#6e3996] !pointer-events-auto !rounded-full !h-[50px] !text-lg !text-white hover:!text-[#6e3996] hover:!bg-white !border-2 hover:!border-[#6e3996]"
                    onClick={() => setShowConfirmationDialog(true)}
                >
                    Continue
                </Button>
            </div>
            <ConfirmationDialog
                onClose={() => setShowConfirmationDialog(false)}
                time={time}
                date={date}
                open={showConfirmationDialog}
                cinema={cinema}
                city={city}
                movieTitle={movieTitle}
            />
        </div>
    );
};
