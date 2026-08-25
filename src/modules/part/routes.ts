import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";
import { createPartSchema, updatePartSchema } from "./validation";
import partController from "./controller";

const router = Router();

const writeRoles = [
    UserRole.ADMIN,
    UserRole.SERVICE_ADVISOR,
    UserRole.TECHNICIAN
] as const;

router.use(authenticate);

router.post(
    "/",
    authorize(...writeRoles),
    validate(createPartSchema),
    partController.create
);

router.put(
    "/:id",
    authorize(...writeRoles),
    validate(updatePartSchema),
    partController.update
);

router.delete(
    "/:id",
    authorize(...writeRoles),
    partController.deletePart
);

router.get("/", partController.getParts);
router.get("/low-stock", partController.getLowStockParts);
router.get("/:id", partController.getPartById);

export default router;
