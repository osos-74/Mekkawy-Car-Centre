import { Router } from "express";

import authController from "./controller";
import { loginDto, refreshTokenDto, logoutDto } from "./validation";
import validate from "../../common/middleware/validate";

const router = Router();

router.post(
    "/login",
    validate(loginDto),
    authController.login
);

router.post(
    "/refresh",
    validate(refreshTokenDto),
    authController.refresh
);

router.post(
    "/logout",
    validate(logoutDto),
    authController.logout
);

export default router;
