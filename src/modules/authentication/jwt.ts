import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../../common/errors/UnauthorizedError";
import { getJwtAccessSecret, getJwtRefreshSecret } from "../../config/env";

import { UserRole } from "../user/model";
import { AccessTokenPayload, RefreshTokenPayload } from "./types";

export function generateAccessToken(
    userId: number,
    role: UserRole
): string {

    const payload: AccessTokenPayload = {
        sub: userId,
        role,
        type: "access"
    };

    return jwt.sign(
        payload,
        getJwtAccessSecret(),
        {
            expiresIn: "15m"
        }
    );
}

export function generateRefreshToken(userId: number): string {
    const payload: RefreshTokenPayload = {
        sub: userId,
        type: "refresh"
    };

    return jwt.sign(
        payload,
        getJwtRefreshSecret(),
        {
            expiresIn: "7d"
        }
    );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    try {
        const payload = jwt.verify(
            token,
            getJwtAccessSecret()
        ) as unknown as AccessTokenPayload;

        if (payload.type !== "access") {
            throw new UnauthorizedError("Invalid token");
        }

        return payload;
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw error;
        }

        throw new UnauthorizedError("Invalid or expired token");
    }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
        const payload = jwt.verify(
            token,
            getJwtRefreshSecret()
        ) as unknown as RefreshTokenPayload;

        if (payload.type !== "refresh") {
            throw new UnauthorizedError("Invalid token");
        }

        return payload;
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw error;
        }

        throw new UnauthorizedError("Invalid or expired token");
    }
}
