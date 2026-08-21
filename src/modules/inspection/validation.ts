import { z } from "zod";

export const createInspectionSchema = z.object({
  customerId: z
    .number()
    .int()
    .positive("Customer ID must be a positive integer"),

 carId: z
    .number()
    .int()
    .positive("Customer ID must be a positive integer"),

  notes: z
    .string()
    .trim()
    .min(1, "Model is required")
    .max(100, "Model cannot exceed 100 characters"),

    mileage: z
    .number()
    .int()
    .min(0, "Mileage must be a non-negative integer")
   
});
export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export const filterInspectionSchema = z
  .object({
    search: z.string().optional(),
  })
  .strict();

// export const updateCarSchema = createCarSchema
//   .omit({
//     customerId: true,
//   })
//   .partial();
