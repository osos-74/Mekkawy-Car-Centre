import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type ValidationTarget = "body" | "query" | "params";

export default function validate(
    schema: ZodType,
    target: ValidationTarget = "body"
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const result = schema.safeParse(req[target]);

        if (!result.success) {
            return next(result.error);
        }

        Object.assign(req[target], result.data);

        next();
    };
}