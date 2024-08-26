import { FC, ReactElement } from 'react';

import { Accordion as MaterialAccordion } from '@mui/material';

interface AccordionProps {
    children: ReactElement[];
    expanded?: boolean;
    className?: string;
}

export const Accordion: FC<AccordionProps> = ({ children, expanded, className }) => {
    return <MaterialAccordion className={className} expanded={expanded}>{children}</MaterialAccordion>;
};