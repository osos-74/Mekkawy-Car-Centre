
import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name cannot exceed 100 characters"),

    phoneNumber: z
        .string()
        .trim()
        .min(8, "Phone number is too short")
        .max(20, "Phone number is too long"),

    address: z
        .string()
        .trim()
        .min(3, "Address must be at least 3 characters")
        .max(255, "Address cannot exceed 255 characters"),
});
export const CustomerIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const CustomerFilterDtoSchema = z.object({
    search: z.string().trim().optional(),
});
export const updateCustomerSchema = createCustomerSchema.partial();