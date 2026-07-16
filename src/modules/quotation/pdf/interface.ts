import  Quotation  from "../quotation/model";
import  Customer  from "../../customer/model";
import  Car  from "../../car/model";
import  QuotationLine  from "../../quotation-line/model";
export interface QuotationPdfData {
    quotation: Quotation;
    customer: Customer;
    car: Car;
    quotationLines: QuotationLine[];
}