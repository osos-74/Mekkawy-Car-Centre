import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";
import { createServiceSchema, updateServiceSchema } from "./validation";

import serviceController from "./controller";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(UserRole.ADMIN),
    validate(createServiceSchema),
    serviceController.create
);

router.put(
    "/:id",
    authorize(UserRole.ADMIN),
    validate(updateServiceSchema),
    serviceController.update
);

router.delete(
    "/:id",
    authorize(UserRole.ADMIN),
    serviceController.deleteService
);

router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServiceById);

export default router;
