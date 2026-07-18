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
export interface QuotationLineAttributes {
  quotationLineId: number;

  quotationId: number;

  type: "PART" | "SERVICE";
  partId: number | null;
  serviceId: number | null;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  lineTotal: number;
}
