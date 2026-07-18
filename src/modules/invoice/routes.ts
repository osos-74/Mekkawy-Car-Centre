import { Router } from "express";
const express = require("express");
const cors = require("cors");

import validate from "../../common/middleware/validate";
import { createInvoiceSchema, invoiceIdSchema } from "./validation";
import invoiceController from "./controller";

const router = Router();

router.post(
  "/",
  validate(createInvoiceSchema),
  invoiceController.createInvoice,
);

router.get("/:id", invoiceController.getInvoiceById);

router.patch("/:id", invoiceController.updateInvoice);

router.delete("/:id", invoiceController.deleteInvoice);

router.get(
  "/:id/pdf",
  validate(invoiceIdSchema,"params"),
  invoiceController.generatePdf,
);

router.get(
  "/invoice-pdf/:id",
  validate(invoiceIdSchema,"params"),
  invoiceController.getInvoicePdfData,
);

export default router;
