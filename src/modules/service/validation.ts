import { z } from "zod";

export const createServiceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Service name must be at least 2 characters")
        .max(100, "Service name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters")
        .optional(),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    estimatedDuration: z
        .number()
        .int("Estimated duration must be an integer")
        .positive("Estimated duration must be greater than 0")
        .optional(),

    isActive: z
        .boolean()
        .optional(),
});

export const updateServiceSchema = createServiceSchema.partial();