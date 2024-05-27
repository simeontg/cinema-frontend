import { Tabs as MaterialTabs } from "@mui/material";
import { FC, ReactNode } from "react";

interface TabsProps {
    children: ReactNode,
    value: any,
    className?: string,
    onChange?: () => void
}

export const Tabs: FC<TabsProps> = ({ children, value, className, onChange }) => {
    return (
        <MaterialTabs onChange={onChange} className={className} value={value}>
            {children}
        </MaterialTabs>
    )
}