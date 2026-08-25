import crypto from "crypto";

import RefreshToken from "./model/RefreshToken";

export function hashToken(token: string): string {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

class RefreshTokenRepository {

    async create(
        userId: number,
        token: string,
        expiresAt: Date
    ): Promise<RefreshToken> {
        return RefreshToken.create({
            userId,
            tokenHash: hashToken(token),
            expiresAt
        });
    }

    async findValidByToken(token: string): Promise<RefreshToken | null> {
        const record = await RefreshToken.findOne({
            where: {
                tokenHash: hashToken(token),
                revokedAt: null
            }
        });

        if (!record || record.expiresAt <= new Date()) {
            return null;
        }

        return record;
    }

    async revoke(record: RefreshToken): Promise<void> {
        await record.update({ revokedAt: new Date() });
    }

    async revokeByToken(token: string): Promise<boolean> {
        const record = await RefreshToken.findOne({
            where: {
                tokenHash: hashToken(token),
                revokedAt: null
            }
        });

        if (!record) {
            return false;
        }

        await this.revoke(record);
        return true;
    }
}

export default new RefreshTokenRepository();
