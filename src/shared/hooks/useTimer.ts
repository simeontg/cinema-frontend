import { useEffect, useState } from 'react';

interface UseTimerProps {
    date: Date | null;
}

const useTimer = ({ date }: UseTimerProps) => {
    const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

    useEffect(() => {
        if (date) {
            const timer = setInterval(() => {
                const currentTime = new Date().getTime();
                const differenceInSeconds = Math.floor((date.getTime() - currentTime) / 1000);

                if (differenceInSeconds >= 0) {
                    setSecondsRemaining(differenceInSeconds);
                } else {
                    setSecondsRemaining(0);
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setSecondsRemaining(null);
        }
    }, [date]);

    return secondsRemaining;
};

export default useTimer;
