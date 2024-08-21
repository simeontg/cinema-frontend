import { useEffect } from 'react';
import io from 'socket.io-client';

interface UseSocketProps<T> {
    url: string;
    entity: string;
    onListen: (data: T) => void;
}

const useSocket = <T>({ url, entity, onListen }: UseSocketProps<T>) => {
    useEffect(() => {
        const socket = io(url);

        socket.on(entity, onListen);

        return () => {
            socket.off(entity, onListen);
            socket.disconnect();
        };
    }, [url, entity, onListen]);
};

export default useSocket;
