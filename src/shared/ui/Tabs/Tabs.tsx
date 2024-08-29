import { FC, ReactNode } from 'react';

import { Tabs as MaterialTabs } from '@mui/material';

interface TabsProps {
    children: ReactNode;
    value: number;
    className?: string;
    onChange?: () => void;
    orientation?: 'horizontal' | 'vertical'
    centered?: boolean;
}

export const Tabs: FC<TabsProps> = ({ children, value, className, onChange, centered, orientation }) => {
    return (
        <MaterialTabs orientation={orientation} centered={centered} onChange={onChange} className={className} value={value}>
            {children}
        </MaterialTabs>
    );
};
