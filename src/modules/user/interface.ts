import { UserRole } from "./model";

export interface UserAttributes {
    userId: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
