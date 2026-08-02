export enum EmployeeRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    RECEPTIONIST = "RECEPTIONIST",
    ENGINEER = "ENGINEER",
    TECHNICIAN = "TECHNICIAN",
}

export enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    ON_LEAVE = "ON_LEAVE",
    TERMINATED = "TERMINATED",
}

export interface EmployeeAttributes {
    employeeId: number;
    employeeNumber: string;

    firstName: string;
    lastName: string;

    phoneNumber: string;
    email?: string;
    address?: string;

    role: EmployeeRole;
    status: EmployeeStatus;

    salary?: number;

    hireDate: Date;

    notes?: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface CreateEmployeeDto {
    employeeNumber: string;

    firstName: string;
    lastName: string;

    phoneNumber: string;
    email?: string;
    address?: string;

    role: EmployeeRole;

    salary?: number;

    hireDate: Date;

    notes?: string;
}

export interface UpdateEmployeeDto {
    firstName?: string;
    lastName?: string;

    phoneNumber?: string;
    email?: string;
    address?: string;

    role?: EmployeeRole;

    salary?: number;

    hireDate?: Date;

    notes?: string;
}

export interface EmployeeFilterDto {
    search?: string;
    role?: EmployeeRole;
    status?: EmployeeStatus;
}