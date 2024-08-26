import { FC, ReactElement, ReactNode } from 'react';

import { Tooltip as MaterialTooltip } from '@mui/material';

interface TooltipProps {
    children: ReactElement;
    title: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({ children, title }) => {
    return (
        <MaterialTooltip
            classes={{
                tooltip: '!bg-[#6e3996] !py-4 !text-white'
            }}
            placement="top"
            title={title}
        >
            {children}
        </MaterialTooltip>
    );
};
