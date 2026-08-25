import { Request, Response, NextFunction } from "express";

import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

import { UserRole } from "../../modules/user/model";

export default function authorize(...roles: UserRole[]) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new UnauthorizedError();
        }

        if (!roles.includes(req.user.role)) {
            throw new ForbiddenError("You do not have permission to perform this action");
        }

        next();
    };
}
