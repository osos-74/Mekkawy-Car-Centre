export interface InspectionAttributes {
  inspectionId: number;

  carId: number;

  // customerId: number;

  mileage: number;

  notes: string;
}

export interface CreateInspectionDto {
  carId: number;

  // customerId: number;

  mileage: number;

  notes : string;

}

// export interface UpdateCarDto {
//   make?: string;
//   model?: string;
//   year?: number;

//   plateNumber?: string;
//   engineNumber?: string;
//   bodyNumber?: string;
//   mileage?: number;
// }

export interface filterInspectionDto {
  search?: string;
}
