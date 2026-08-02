import Quotation from "../model";
import Customer from "../../customer/model";
import Car from "../../car/model";
import QuotationLine from "../../quotationLine/model";

export interface QuotationPdfData {
    quotation: Quotation;
    customer: Customer;
    car: Car;
    quotationLines: QuotationLine[];
}
export interface QuotationPdfLine {
    type: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    lineTotal: number;
}
export interface CompanyInfo {
    name: string;
    slogan: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}