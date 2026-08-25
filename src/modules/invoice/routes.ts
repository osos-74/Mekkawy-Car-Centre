import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";
import { createInvoiceSchema, invoiceIdSchema } from "./validation";
import invoiceController from "./controller";

const router = Router();

const invoiceRoles = [UserRole.ADMIN, UserRole.CASHIER] as const;

router.use(authenticate);

router.post(
    "/",
    authorize(...invoiceRoles),
    validate(createInvoiceSchema),
    invoiceController.createInvoice,
);

router.get("/", authorize(...invoiceRoles), invoiceController.getInvoices);

router.get(
    "/:id",
    authorize(...invoiceRoles),
    invoiceController.getInvoiceById
);

router.patch(
    "/:id",
    authorize(...invoiceRoles),
    invoiceController.updateInvoice
);

router.delete(
    "/:id",
    authorize(...invoiceRoles),
    invoiceController.deleteInvoice
);

router.get(
    "/:id/pdf",
    authorize(...invoiceRoles),
    validate(invoiceIdSchema, "params"),
    invoiceController.generatePdf,
);

router.get(
    "/invoice-pdf/:id",
    authorize(...invoiceRoles),
    validate(invoiceIdSchema, "params"),
    invoiceController.getInvoicePdfData,
);

export default router;
