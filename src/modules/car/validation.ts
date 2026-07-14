import { z } from "zod";

export const createCarSchema = z.object({
    customerId: z
        .number()
        .int()
        .positive("Customer ID must be a positive integer"),

    make: z
        .string()
        .trim()
        .min(2, "Make must be at least 2 characters")
        .max(100, "Make cannot exceed 100 characters"),

    model: z
        .string()
        .trim()
        .min(1, "Model is required")
        .max(100, "Model cannot exceed 100 characters"),

    year: z
        .number()
        .int()
        .min(1900, "Invalid manufacturing year")
        .max(
            new Date().getFullYear() + 1,
            "Invalid manufacturing year"
        ),

    plateNumber: z
        .string()
        .trim()
        .min(3, "Plate number is required")
        .max(30, "Plate number cannot exceed 30 characters"),

    engineNumber: z
        .string()
        .trim()
        .min(3, "Engine number is required")
        .max(100, "Engine number cannot exceed 100 characters"),

    bodyNumber: z
        .string()
        .trim()
        .min(3, "Body number is required")
        .max(100, "Body number cannot exceed 100 characters"),
});

export const updateCarSchema = createCarSchema
    .omit({
        customerId: true,
    })
    .partial();