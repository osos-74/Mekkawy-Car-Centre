import bcrypt from "bcrypt";

import { UnauthorizedError } from "../../common/errors/UnauthorizedError";

import userRepository from "../user/repository";
import { UserRole } from "../user/model";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "./jwt";
import refreshTokenRepository from "./refreshTokenRepository";

import { LoginDTO } from "./validation";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function buildAuthResponse(
    user: {
        userId: number;
        name: string;
        email: string;
        role: UserRole;
    },
    accessToken: string,
    refreshToken: string
) {
    return {
        accessToken,
        refreshToken,
        user: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}

function getRefreshExpiryDate(): Date {
    return new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
}

class AuthService {

    async login(data: LoginDTO) {
        const user = await userRepository.findByEmailForAuth(data.email);

        if (!user || !user.isActive) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const passwordMatches = await bcrypt.compare(
            data.password,
            user.passwordHash
        );

        if (!passwordMatches) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const accessToken = generateAccessToken(user.userId, user.role);
        const refreshToken = generateRefreshToken(user.userId);

        await refreshTokenRepository.create(
            user.userId,
            refreshToken,
            getRefreshExpiryDate()
        );

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    async refresh(refreshToken: string) {
        verifyRefreshToken(refreshToken);

        const storedToken =
            await refreshTokenRepository.findValidByToken(refreshToken);

        if (!storedToken) {
            throw new UnauthorizedError("Invalid or expired token");
        }

        const user = await userRepository.findById(storedToken.userId);

        if (!user || !user.isActive) {
            throw new UnauthorizedError("Invalid or expired token");
        }

        await refreshTokenRepository.revoke(storedToken);

        const newAccessToken = generateAccessToken(user.userId, user.role);
        const newRefreshToken = generateRefreshToken(user.userId);

        await refreshTokenRepository.create(
            user.userId,
            newRefreshToken,
            getRefreshExpiryDate()
        );

        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }

    async logout(refreshToken: string): Promise<void> {
        const revoked =
            await refreshTokenRepository.revokeByToken(refreshToken);

        if (!revoked) {
            throw new UnauthorizedError("Invalid or expired token");
        }
    }
}

export default new AuthService();
