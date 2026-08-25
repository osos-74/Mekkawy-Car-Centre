export interface CarAttributes {
  carId: number;
  customerId: number;

  make: string;
  model: string;
  year: number;

  plateNumber: string;
  engineNumber: string;
  bodyNumber: string;
  mileage: number;
}

export interface CreateCarDto {
  customerId: number;

  make: string;
  model: string;
  year: number;

  plateNumber: string;
  engineNumber: string;
  bodyNumber: string;
  mileage: number;
}

// export type createCarRequest = {
//   make: string;
//   model: string;
//   year: number;

//   plateNumber: string;
//   engineNumber: string;
//   bodyNumber: string;
//   mileage: number;
// }

export interface UpdateCarDto {
  make?: string;
  model?: string;
  year?: number;

  plateNumber?: string;
  engineNumber?: string;
  bodyNumber?: string;
  mileage?: number;}

export interface filterCarDto {
  search?: string;
}

export interface CarService {
  getCar: (name: string, model: string, type: string) => Promise<string>;
  createCar: (name: string) => Promise<UpdateCarDto>
}