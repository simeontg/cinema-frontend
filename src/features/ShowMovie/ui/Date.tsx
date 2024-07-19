import { FC, useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'shared/hooks/i18nHook';

interface DateProps {
    month: string;
    date: number;
    day: string;
}

export const Date: FC<DateProps> = ({ month, date, day }) => {
    const [isActiveDate, setIsActiveDate] = useState(false);
    const { t } = useTranslation('common');
    return (
        <div
            className={clsx(
                'rounded-md flex cursor-pointer items-center justify-center flex-col w-[30px] h-[30px] p-12 min-w-0',
                isActiveDate ? 'text-white bg-[#6e3996]' : 'hover:text-[#6e3996]'
            )}
            onClick={() => setIsActiveDate(true)}
        >
            <p className="text-md">{t(month)}</p>
            <p className="text-4xl font-bold">{date}</p>
            <p className="text-md">{t(day).toUpperCase()}</p>
        </div>
    );
};
