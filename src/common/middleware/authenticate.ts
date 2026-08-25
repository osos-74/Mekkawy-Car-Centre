import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import { verifyAccessToken } from "../../modules/authentication/jwt";
import userRepository from "../../modules/user/repository";

export default async function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            throw new UnauthorizedError("Missing or invalid authorization header");
        }

        const token = header.slice("Bearer ".length).trim();

        if (!token) {
            throw new UnauthorizedError("Missing or invalid authorization header");
        }

        const payload = verifyAccessToken(token);

        const user = await userRepository.findById(payload.sub);

        if (!user || !user.isActive) {
            throw new UnauthorizedError("Invalid or expired token");
        }

        req.user = {
            userId: user.userId,
            role: user.role
        };

        next();
    } catch (error) {
        next(error);
    }
}
