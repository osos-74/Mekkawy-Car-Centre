export interface CreateJobOrderLineDto {
  jobOrderId: number;

  type: "PART" | "SERVICE";

  partId?: number;

  serviceId?: number;

  quantity: number;

  description: string;
}

export interface UpdateJobOrderLineDto {
  quantity?: number;

  discount?: number;
}
