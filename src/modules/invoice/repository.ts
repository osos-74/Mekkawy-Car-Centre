import { Transaction } from "sequelize";
import Invoice from "./model";
import { CreateInvoiceData, UpdateInvoiceDto } from "./interface";

class InvoiceRepository {
  async create(
    data: CreateInvoiceData,
    transaction?: Transaction
  ) {
    return Invoice.create(data, { transaction });
  }

  async findById(
    invoiceId: number,
    transaction?: Transaction
  ) {
    return Invoice.findByPk(invoiceId, { transaction });
  }

  async findByQuotationId(
    quotationId: number,
    transaction?: Transaction
  ) {
    return Invoice.findOne({
      where: { quotationId },
      transaction,
    });
  }

  async update(
    invoice: Invoice,
    data: UpdateInvoiceDto,
    transaction?: Transaction
  ) {
    return invoice.update(data, { transaction });
  }

  async delete(
    invoice: Invoice,
    transaction?: Transaction
  ) {
    return invoice.destroy({ transaction });
  }

  async findAll() {
    return Invoice.findAll();
  }
}

export default new InvoiceRepository();