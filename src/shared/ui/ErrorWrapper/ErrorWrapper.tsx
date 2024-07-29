import { FC, ReactNode } from 'react';

interface ErrorWrapperProps {
    isError?: boolean;
    children: ReactNode;
}

export const ErrorWrapper: FC<ErrorWrapperProps> = ({ isError, children }) => {
    if (isError) {
        return <div>Something went wrong...</div>;
    }

    return <>{children}</>;
};
