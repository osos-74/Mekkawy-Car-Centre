import { Request, Response } from "express";

import { asyncHandler } from "../../common/middleware/asyncHandler";

import userService from "./service";

class UserController {

    create = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    });

    getById = asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);

        res.status(200).json({
            success: true,
            data: user
        });
    });

    getAll = asyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });
    });

    update = asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.id);
        const user = await userService.updateUser(userId, req.body);

        res.status(200).json({
            success: true,
            data: user
        });
    });
}

export default new UserController();
