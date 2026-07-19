import { Transaction } from "sequelize";

import invoiceRepository from "./repository";
import quotationService from "../quotation/service";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Response } from "express";
import { InvoicePdfGenerator } from "./pdf/invoicePdfGenerator";
import { InvoicePdfData } from "./pdf/interface";
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceData,
} from "./interface";

import carRepository from "../car/repository";
import carService from "../car/service";
import customerService from "../customer/service";
import quotationLineRepository from "../quotationLine/repository";

class InvoiceService {
  async createInvoice(dto: CreateInvoiceDto, transaction?: Transaction) {
    const quotation = await quotationService.getQuotationById(
      dto.quotationId,
      transaction,
    );

    if (!quotation) throw new NotFoundError("Quotation not found");

    if (quotation.status !== "Approved")
      throw new BadRequestError("Only approved quotations can be invoiced.");

    const existing = await invoiceRepository.findByQuotationId(
      dto.quotationId,
      transaction,
    );

    if (existing) throw new BadRequestError("Invoice already exists.");

    const invoiceNumber = await this.generateInvoiceNumber();

    const invoiceData: CreateInvoiceData = {
      quotationId: dto.quotationId,

      invoiceNumber,

      status: "Unpaid",

      notes: dto.notes ?? null,

      issuedAt: new Date(),

      paidAt: null,
    };

    return invoiceRepository.create(invoiceData, transaction);
  }

  async getInvoiceById(invoiceId: number, transaction?: Transaction) {
    const invoice = await invoiceRepository.findById(invoiceId, transaction);

    if (!invoice) throw new NotFoundError("Invoice not found");

    return invoice;
  }

  async updateInvoice(
    invoiceId: number,
    dto: UpdateInvoiceDto,
    transaction?: Transaction,
  ) {
    const invoice = await this.getInvoiceById(invoiceId, transaction);

    return invoiceRepository.update(invoice, dto, transaction);
  }

  async deleteInvoice(invoiceId: number, transaction?: Transaction) {
    const invoice = await this.getInvoiceById(invoiceId, transaction);

    return invoiceRepository.delete(invoice, transaction);
  }

  private async generateInvoiceNumber() {
    const invoice = await invoiceRepository.findAll();

    return `INV-${String(invoice.length + 1).padStart(6, "0")}`;
  }

  async getInvoicePdfData(invoiceId: number): Promise<InvoicePdfData> {
    const invoice = await invoiceRepository.findById(invoiceId);

    if (!invoice) {
      throw new NotFoundError("Invoice not found");
    }
    const quotation = await quotationService.getQuotationById(
      invoice.quotationId,
    );

    if (!invoice) {
      throw new NotFoundError("Invoice not found");
    }
    if (!quotation) {
      throw new NotFoundError("Quotation not found");
    }
    const customer = await customerService.getCustomerById(
      quotation.customerId,
    );
    if (!customer) throw new NotFoundError("Customer not found");

    const car = await carRepository.findById(quotation.carId);
    if (!car) throw new NotFoundError("Car not found");
    const quotationLines = await quotationLineRepository.findByQuotationId(
      quotation.quotationId,
    );
    if (!quotationLines) throw new NotFoundError("Quotation Lines not found");
    return {
      invoice: invoice.toJSON(),
      quotation: quotation.toJSON(),
      customer: customer.toJSON(),
      car: car.toJSON(),
      quotationLines: quotationLines.map((line) => line.toJSON()),
    };
  }
  async generateInvoicepdf(invoiceId: number, res: Response) {
    const generator = new InvoicePdfGenerator();
    const pdfData = await this.getInvoicePdfData(invoiceId);
    const {pdf,filename} = await generator.generate(pdfData);

    if (!pdf) {
      throw new NotFoundError("Invoice PDf Data not found");
    }
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    pdf.pipe(res)
    pdf.end()

  }
}
export default new InvoiceService();
