import { z } from "zod";

export const createPartSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Part name must be at least 2 characters")
        .max(100, "Part name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters")
        .optional(),

    sellingPrice: z
        .number()
        .positive("Selling price must be greater than 0"),

    costPrice: z
        .number()
        .positive("Cost price must be greater than 0"),

    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(0, "Quantity cannot be negative"),

    minimumQuantity: z
        .number()
        .int("Minimum quantity must be an integer")
        .min(0, "Minimum quantity cannot be negative")
        .optional(),
});

export const updatePartSchema = createPartSchema
    .omit({
        quantity: true,
    })
    .partial();