import { Request, Response } from "express";

import {asyncHandler} from "../../common/middleware/asyncHandler";

import invoiceService from "./service";

class InvoiceController {
  createInvoice = asyncHandler(async (req: Request, res: Response) => {
    const invoice = await invoiceService.createInvoice(req.body);
    res.status(201).json({
      success: true,
      message: "Invoice created successfully.",
      data: invoice,
    });
  });

  getInvoiceById = asyncHandler(async (req: Request, res: Response) => {
    const invoice = await invoiceService.getInvoiceById(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: invoice,
    });
  });

  updateInvoice = asyncHandler(async (req: Request, res: Response) => {
    const invoice = await invoiceService.updateInvoice(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully.",
      data: invoice,
    });
  });

  deleteInvoice = asyncHandler(async (req: Request, res: Response) => {
    await invoiceService.deleteInvoice(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully.",
    });
  });

generatePdf = asyncHandler(async (req, res) => {
    await invoiceService.generateInvoicepdf(Number(req.params.id));
       res.status(200).json({
      success: true,
      message: "Invoice printed successfully.",
    });
});
}

export default new InvoiceController();