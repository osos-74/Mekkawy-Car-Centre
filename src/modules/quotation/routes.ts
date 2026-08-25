import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import {
    createQuotationSchema,
    updateQuotationSchema,
    filterQuotationSchema,
    quotationIdSchema
} from "./validation";

import quotationController from "./controller";
import { createQuotationLineSchema } from "../quotationLine/validation";

const router = Router();

const writeRoles = [UserRole.ADMIN, UserRole.SERVICE_ADVISOR] as const;
const pdfRoles = [
    UserRole.ADMIN,
    UserRole.SERVICE_ADVISOR,
    UserRole.CASHIER
] as const;

router.use(authenticate);

router.post(
    "/",
    authorize(...writeRoles),
    validate(createQuotationSchema),
    quotationController.create
);

router.get(
    "/",
    validate(filterQuotationSchema, "query"),
    quotationController.getQuotations
);

router.put(
    "/:id",
    authorize(...writeRoles),
    validate(updateQuotationSchema),
    quotationController.update
);

router.put(
    "/:id/approve",
    authorize(...writeRoles),
    validate(quotationIdSchema, "params"),
    quotationController.approveQuotation
);

router.delete(
    "/:id",
    authorize(...writeRoles),
    quotationController.deleteQuotation
);

router.post(
    "/add-line",
    authorize(...writeRoles),
    validate(createQuotationLineSchema),
    quotationController.addLine
);

router.get(
    "/:id/pdf",
    authorize(...pdfRoles),
    validate(quotationIdSchema, "params"),
    quotationController.generatePdf
);

router.delete(
    "/delete-line/:id",
    authorize(...writeRoles),
    quotationController.deleteLine
);

router.get(
    "/quotation-pdf/:id",
    authorize(...pdfRoles),
    validate(quotationIdSchema, "params"),
    quotationController.getQuotationPdfData
);

export default router;
