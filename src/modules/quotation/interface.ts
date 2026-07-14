export interface QuotationAttributes {
    quotationId: number;

    customerId: number;
    carId: number;

    subtotal: number;
    discount: number;
    total: number;

    status: "Draft" | "Approved" | "Rejected" | "Expired";

    notes: string | null;
}

export interface CreateQuotationDto {
    customerId: number;
    carId: number;

    discount?: number;

    notes?: string;
}

export interface UpdateQuotationDto {
    discount?: number;

    status?: "Draft" | "Approved" | "Rejected" | "Expired";

    notes?: string;
}