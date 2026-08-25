import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import { createCarSchema, filterCarSchema, IdSchema } from "./validation";

import carController from "./controller";

const router = Router();

router.use(authenticate);

router.get("/", validate(filterCarSchema, "query"), carController.getCars);

router.post(
    "/",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    validate(createCarSchema, "body"),
    carController.create
);

router.put(
    "/:id",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    validate(createCarSchema, "body"),
    carController.update
);

router.delete(
    "/:id",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    carController.delete
);

router.get(
    "/customer/:id",
    validate(IdSchema, "params"),
    carController.getCarByCustomerId
);

export default router;
