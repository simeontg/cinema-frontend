import { FC, ReactNode } from 'react';

import { Tab as MaterialTab } from '@mui/material';

interface TabProps {
    label: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Tab: FC<TabProps> = ({ label, className, onClick }) => {
    return (
        <MaterialTab
            onClick={onClick}
            className={className}
            style={{ fontSize: '1.2rem' }}
            label={label}
        ></MaterialTab>
    );
};
