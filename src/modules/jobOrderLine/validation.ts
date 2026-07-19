import { z } from "zod";
const jobOrderLineSchema = z.object({
    quotationId: z.number().int().positive(),

    type: z.enum(["PART", "SERVICE"]),

    partId: z.number().int().positive().optional(),

    serviceId: z.number().int().positive().optional(),

    quantity: z.number().positive(),

    discount: z.number().min(0).default(0),
});
export const createJobOrderLineSchema =
    jobOrderLineSchema.superRefine((data, ctx) => {

        if (data.type === "PART" && !data.partId) {
            ctx.addIssue({
                code: "custom",
                message: "partId is required for PART",
                path: ["partId"],
            });
        }

        if (data.type === "SERVICE" && !data.serviceId) {
            ctx.addIssue({
                code: "custom",
                message: "serviceId is required for SERVICE",
                path: ["serviceId"],
            });
        }

    });
export const updateJobOrderLineSchema =
    jobOrderLineSchema.partial();