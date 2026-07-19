import { z } from "zod";

export const createJobOrderSchema = z.object({
    quotationId: z.number().int().positive(),

    mileage: z.number().int().min(0),

    customerComplaint: z
        .string()
        .trim()
        .min(1)
        .max(1000),

    notes: z
        .string()
        .trim()
        .max(1000)
        .optional(),
});

export const updateJobOrderSchema = z.object({
    mileage: z.number().int().min(0).optional(),

    customerComplaint: z
        .string()
        .trim()
        .min(1)
        .max(1000)
        .optional(),

    assignedTechnician: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

    notes: z
        .string()
        .trim()
        .max(1000)
        .optional(),
});

export const updateJobOrderStatusSchema = z.object({
    status: z.enum([
        "Open",
        "In Progress",
        "Completed",
        "Cancelled",
    ]),
});