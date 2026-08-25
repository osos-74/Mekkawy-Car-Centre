import { Router } from "express";

import quotationLineController from "./controller";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import {
    createQuotationLineSchema,
    updateQuotationLineSchema,
} from "./validation";

const router = Router();

const writeRoles = [UserRole.ADMIN, UserRole.SERVICE_ADVISOR] as const;

router.use(authenticate);

router.post(
    "/",
    authorize(...writeRoles),
    validate(createQuotationLineSchema),
    quotationLineController.create
);

router.get("/:id", quotationLineController.getById);

router.get(
    "/quotation/:quotationId",
    quotationLineController.getByQuotationId
);

router.put(
    "/:id",
    authorize(...writeRoles),
    validate(updateQuotationLineSchema),
    quotationLineController.update
);

router.delete(
    "/:id",
    authorize(...writeRoles),
    quotationLineController.delete
);

export default router;
