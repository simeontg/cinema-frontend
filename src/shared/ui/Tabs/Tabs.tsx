import { FC, ReactNode } from 'react';

import { Tabs as MaterialTabs } from '@mui/material';

interface TabsProps {
    children: ReactNode;
    value: number;
    className?: string;
    onChange?: () => void;
}

export const Tabs: FC<TabsProps> = ({ children, value, className, onChange }) => {
    return (
        <MaterialTabs onChange={onChange} className={className} value={value}>
            {children}
        </MaterialTabs>
    );
};
