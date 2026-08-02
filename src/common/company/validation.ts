
import { z } from "zod";

export const updateCompanySchema = z.object({

    name: z.string().optional(),

    slogan: z.string().optional(),

    address: z.string().optional(),

    phone: z.string().optional(),

    email: z.email().optional(),

    website: z.string().optional(),

});