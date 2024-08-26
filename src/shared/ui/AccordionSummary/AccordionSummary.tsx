import { FC, ReactElement, ReactNode } from 'react';

import { AccordionSummary as MaterialAccordionSummary } from '@mui/material';

interface AccordionSummaryProps {
    expandIcon: ReactNode;
    children: ReactElement;
}

export const AccordionSummary: FC<AccordionSummaryProps> = ({ expandIcon, children }) => {
    return <MaterialAccordionSummary expandIcon={expandIcon}>{children}</MaterialAccordionSummary>;
};