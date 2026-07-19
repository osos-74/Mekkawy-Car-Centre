import { QuotationAttributes } from "../quotation/interface";
import { CustomerAttributes } from "../customer/interface";
import { CarAttributes } from "../car/interface";
import { QuotationLineAttributes } from "../quotationLine/interface";

export interface CreateInvoiceDto {
    quotationId: number;
    notes?: string;
}
export interface UpdateInvoiceDto {
    status?: InvoiceStatus;
    paidAt?: Date | null;
    notes?: string;
}
export type InvoiceStatus =
  | "Unpaid"
  | "Partially Paid"
  | "Paid"
  | "Cancelled";

  export interface CreateInvoiceData {
    quotationId: number;

    invoiceNumber: string;

    notes?: string | null;

    status: InvoiceStatus;

    issuedAt?: Date;

    paidAt?: Date | null;
}
export interface InvoiceAttributes {
  invoiceId: number;

  quotationId: number;

  invoiceNumber: string;

  status: InvoiceStatus;

  issuedAt: Date;

  paidAt?: Date | null;

  notes?: string | null;

  createdAt: Date;
  updatedAt: Date;
}
// interface InvoicePdfData {
//     invoice: Invoice;
//     quotation: QuotationAttributes;
//     customer: CustomerAttributes;
//     car: CarAttributes;
//     quotationLines: QuotationLineAttributes[];
// }