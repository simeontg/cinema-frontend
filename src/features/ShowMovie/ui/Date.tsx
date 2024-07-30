import { FC } from 'react';

import clsx from 'clsx';

import { useTranslation } from 'shared/hooks/i18nHook';

interface DateProps {
    month: string;
    date: number;
    day: string;
    wholeDate: Date;
    isActive: boolean;
    onClick: (date: Date) => void;
}

export const Date: FC<DateProps> = ({ month, date, day, wholeDate, isActive, onClick }) => {
    const { t } = useTranslation('common');

    return (
        <div
            className={clsx(
                'rounded-md flex cursor-pointer items-center justify-center flex-col w-[30px] h-[30px] p-12 min-w-0',
                isActive ? 'text-white bg-[#6e3996]' : 'hover:text-[#6e3996]'
            )}
            onClick={() => onClick(wholeDate)}
        >
            <p className="text-md">{t(month)}</p>
            <p className="text-4xl font-bold">{date}</p>
            <p className="text-md">{t(day).toUpperCase()}</p>
        </div>
    );
};
