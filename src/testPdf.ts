import { QuotationPdfGenerator } from "./modules/quotation/pdf/quotationPdfGenerator";

const generator = new QuotationPdfGenerator();

generator.generate();

console.log("PDF Generated!");