import { Router } from "express";

import controller from "./controller";
import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "./model";

import {
    createUserSchema,
    updateUserSchema
} from "./validation";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(UserRole.ADMIN),
    validate(createUserSchema),
    controller.create
);

router.get(
    "/",
    authorize(UserRole.ADMIN),
    controller.getAll
);

router.get(
    "/:id",
    authorize(UserRole.ADMIN),
    controller.getById
);

router.patch(
    "/:id",
    authorize(UserRole.ADMIN),
    validate(updateUserSchema),
    controller.update
);

export default router;
