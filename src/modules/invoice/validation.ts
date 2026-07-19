import { z } from "zod";

export const createInvoiceSchema = z.object({
    quotationId: z.number().int().positive(),
    notes: z.string().optional()
});

export const updateInvoiceSchema = z.object({
    status: z
        .enum(["Unpaid", "Partially Paid", "Paid", "Cancelled"])
        .optional(),

    paidAt: z.coerce.date().nullable().optional(),

    notes: z.string().optional()
});


export const invoiceIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});