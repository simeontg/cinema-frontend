import { Role } from '../api/role.enum';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}
