import { FC, ReactNode } from 'react';

import { AccordionDetails as MaterialAccordionDeatils } from '@mui/material';

interface AccordionDeatilsProps {
    children: ReactNode;
}

export const AccordionDetails: FC<AccordionDeatilsProps> = ({ children }) => {
    return <MaterialAccordionDeatils>{children}</MaterialAccordionDeatils>;
};
