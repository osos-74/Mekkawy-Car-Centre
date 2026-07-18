import { z } from "zod";

export const createQuotationSchema = z.object({
    customerId: z
        .number()
        .int()
        .positive("Customer ID is required"),

    carId: z
        .number()
        .int()
        .positive("Car ID is required"),

    discount: z
        .number()
        .min(0, "Discount cannot be negative")
        .optional(),

    notes: z
        .string()
        .trim()
        .max(500, "Notes cannot exceed 500 characters")
        .optional(),
});

export const updateQuotationSchema = z.object({
    discount: z
        .number()
        .min(0)
        .optional(),

    status: z
        .enum(["Draft", "Approved", "Rejected", "Expired"])
        .optional(),

    notes: z
        .string()
        .trim()
        .max(500)
        .optional(),
});
export const filterQuotationSchema = z.object({
    customerId: z.coerce.number().optional(),
    carId: z.coerce.number().optional(),
    total: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    status: z.enum(["Draft", "Approved", "Rejected", "Expired"]).optional(),
}).strict();
export const quotationIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});