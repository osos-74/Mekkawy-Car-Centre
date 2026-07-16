import { QuotationPdfGenerator } from "./modules/quotation/pdf/quotationPdfGenerator";
import { QuotationPdfData } from "./modules/quotation/pdf/interface";



const data: QuotationPdfData = {
    quotation: {
        quotationId: 1,
        customerId: 1,
        carId: 1,
        subtotal: 650,
        discount: 50,
        total: 600,
        status: "Draft",
        notes: "Valid for 7 days",
    } as any,

    customer: {
        customerId: 1,
        name: "Ahmed Mohamed",
        phoneNumber: "01012345678",
        address: "New Cairo, Egypt",
    } as any,

    car: {
        carId: 1,
        customerId: 1,
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        plateNumber: "ABC-1234",
        bodyNumber: "JTDBR32E",
        engineNumber: "ENG123456",
    } as any,

    quotationLines: [
        {
            quotationLineId: 1,
            quotationId: 1,
            type: "Part",
            description: "Engine Oil 5W-30",
            quantity: 4,
            unitPrice: 100,
            discount: 0,
            lineTotal: 400,
        },
        {
            quotationLineId: 2,
            quotationId: 1,
            type: "Service",
            description: "Oil Change Service",
            quantity: 1,
            unitPrice: 250,
            discount: 0,
            lineTotal: 250,
        }, {
            quotationLineId: 2,
            quotationId: 1,
            type: "Service",
            description: "Oil Change Service",
            quantity: 1,
            unitPrice: 250,
            discount: 0,
            lineTotal: 250,
        }, {
            quotationLineId: 2,
            quotationId: 1,
            type: "Service",
            description: "Oil Change Service",
            quantity: 1,
            unitPrice: 250,
            discount: 0,
            lineTotal: 250,
        }, {
            quotationLineId: 2,
            quotationId: 1,
            type: "Service",
            description: "Oil Change Service",
            quantity: 1,
            unitPrice: 250,
            discount: 0,
            lineTotal: 250,
        }, {
            quotationLineId: 2,
            quotationId: 1,
            type: "Service",
            description: "Oil Change Service",
            quantity: 1,
            unitPrice: 250,
            discount: 0,
            lineTotal: 250,
        },
    ] as any,
};

const generator = new QuotationPdfGenerator();

generator.generate(data);

console.log("PDF Generated!");