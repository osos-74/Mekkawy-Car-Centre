import { UserRole } from "../user/model";

export interface AccessTokenPayload {
    sub: number;
    role: UserRole;
    type: "access";
}

export interface RefreshTokenPayload {
    sub: number;
    type: "refresh";
}
