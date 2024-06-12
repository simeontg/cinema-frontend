import { CSSProperties, FC, ReactNode } from 'react';

import { Tab as MaterialTab } from '@mui/material';

interface TabProps {
    label: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

export const Tab: FC<TabProps> = ({ label, className, onClick, style }) => {
    return (
        <MaterialTab
            onClick={onClick}
            className={className}
            style={style}
            sx={{ opacity: 1, fontSize: '1.2rem' }}
            label={label}
        ></MaterialTab>
    );
};
