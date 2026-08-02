import { z } from "zod";
import { EmployeeRole, EmployeeStatus } from "./interface";

export const createEmployeeSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2)
        .max(50),

    lastName: z
        .string()
        .trim()
        .min(2)
        .max(50),

    phoneNumber: z
        .string()
        .trim()
        .min(10)
        .max(20),

    email: z
        .email()
        .optional(),

    address: z
        .string()
        .trim()
        .max(255)
        .optional(),

    role: z.enum(EmployeeRole),

    hireDate: z.coerce.date(),

    salary: z
        .number()
        .positive()
        .optional(),

    notes: z
        .string()
        .trim()
        .max(500)
        .optional(),
});

export const updateEmployeeSchema =
    createEmployeeSchema.partial();

export const employeeFilterSchema = z.object({
    search: z.string().trim().optional(),

    role: z.enum(EmployeeRole).optional(),

    status: z.enum(EmployeeStatus).optional(),
});

export const employeeIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const updateEmployeeStatusSchema = z.object({
    status: z.enum(EmployeeStatus),
});