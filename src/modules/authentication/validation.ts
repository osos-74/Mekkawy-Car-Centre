import { z } from "zod";

export const loginDto = z.object({
    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(1, "Password is required")
});

export const refreshTokenDto = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required")
});

export const logoutDto = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required")
});

export type LoginDTO = z.infer<typeof loginDto>;
export type RefreshTokenDTO = z.infer<typeof refreshTokenDto>;
export type LogoutDTO = z.infer<typeof logoutDto>;
