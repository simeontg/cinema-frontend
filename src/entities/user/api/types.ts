import { UserRole } from './role.enum';

export interface GetUserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}
