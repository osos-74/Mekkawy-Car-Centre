export interface CreateQuotationLineDto {
    quotationId: number;

    type: "PART" | "SERVICE";

    partId?: number;

    serviceId?: number;

    quantity: number;

    discount?: number;
}

export interface UpdateQuotationLineDto {
    quantity?: number;

    discount?: number;
}