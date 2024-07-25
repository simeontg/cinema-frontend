export interface Cinema {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    city: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
    }
}