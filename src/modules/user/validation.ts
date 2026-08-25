import { z } from "zod";
import { UserRole } from "./model";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100),

    email: z
        .string()
        .email(),

    password: z
        .string()
        .min(8),

    role: z.nativeEnum(UserRole)
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    email: z
        .string()
        .email()
        .optional(),

    role: z
        .nativeEnum(UserRole)
        .optional(),

    isActive: z
        .boolean()
        .optional()
});
