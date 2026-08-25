import { Request, Response } from "express";

import { asyncHandler } from "../../common/middleware/asyncHandler";

import authService from "./service";

class AuthController {

    login = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            data: result
        });
    });

    refresh = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.refresh(req.body.refreshToken);

        res.status(200).json({
            success: true,
            data: result
        });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
        await authService.logout(req.body.refreshToken);

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    });
}

export default new AuthController();
