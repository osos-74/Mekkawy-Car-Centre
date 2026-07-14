import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../errors/BadRequestError";

export const validate =
    (schema: ZodSchema): RequestHandler =>
    (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            return next(
                new BadRequestError(
                    result.error.issues
                        .map(issue => issue.message)
                        .join(", ")
                )
            );
        }

        req.body = result.data;

        next();
    };