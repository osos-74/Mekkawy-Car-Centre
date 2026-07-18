export interface CreateJobOrderDto {
  
  quotationId: number;
  mileage: number;
  notes?: string;
  assignedTechnician: string;


}
export interface CreateJobOrderData {
    quotationId: number;

    mileage: number;

    customerComplaint: string;

    assignedTechnician: string;

    status: JobOrderStatus;

    notes?: string | null;

    completedAt?: Date | null;
}
export type JobOrderStatus =
    | "Open"
    | "In Progress"
    | "Completed"
    | "Cancelled";

export interface UpdateJobOrderDto {
    mileage?: number;
    customerComplaint?: string;
    assignedTechnician?: string;
    notes?: string;
}

