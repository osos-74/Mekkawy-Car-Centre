import { Transaction } from "sequelize";

import invoiceRepository from "./repository";
import quotationService from "../quotation/service";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Response } from "express";
import { CreateInvoiceDto, UpdateInvoiceDto ,CreateInvoiceData} from "./interface";

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
  
generatePdf(invoiceId: number, res: Response){
    return null
}
}
export default new InvoiceService();
