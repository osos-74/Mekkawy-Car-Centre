import { UserRole } from "./model";

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    role?: UserRole;
}

export interface UserResponseDTO {
    userId: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}   