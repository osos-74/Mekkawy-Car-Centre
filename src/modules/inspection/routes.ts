import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import {
    createInspectionSchema,
    filterInspectionSchema,
    IdSchema
} from "./validation";

import inspectionController from "./controller";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    validate(filterInspectionSchema, "query"),
    inspectionController.getInspections
);

router.post(
    "/",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR, UserRole.TECHNICIAN),
    validate(createInspectionSchema, "body"),
    inspectionController.create
);

router.get(
    "/customer/:id",
    validate(IdSchema, "params"),
    inspectionController.getInspectionByCustomerId
);

router.get(
    "/car/:id",
    validate(IdSchema, "params"),
    inspectionController.getInspectionByCarId
);

export default router;
