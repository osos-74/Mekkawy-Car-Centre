import Quotation from "../model";
import Customer from "../../customer/model";
import Car from "../../car/model";
import QuotationLine from "../../quotationLine/model";
import { InvoiceAttributes } from "../../invoice/interface";
import { CustomerAttributes } from "../../customer/interface";
import { CarAttributes } from "../../car/interface";
import { QuotationLineAttributes } from "../../quotationLine/interface";
import { QuotationAttributes } from "../../quotation/interface";


export interface InvoicePdfData {
    invoice: InvoiceAttributes;
    quotation:QuotationAttributes
    customer: CustomerAttributes;
    car: CarAttributes;
    quotationLines: QuotationLineAttributes[];
}
export interface QuotationPdfLine {
    type: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    lineTotal: number;
}