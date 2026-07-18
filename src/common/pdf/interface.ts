import { QuotationAttributes } from "../../modules/quotation/interface";
import { CustomerAttributes } from "../../modules/customer/interface";
import { CarAttributes } from "../../modules/car/interface";
import { QuotationLineAttributes } from "../../modules/quotationLine/interface";

export interface PdfDocumentData {
  customer: CustomerAttributes;

  car: CarAttributes;

  lines: QuotationLineAttributes[];

  subtotal: number;

  discount: number;

  total: number;

  notes?: string | null;
}
