export interface CarAttributes {
    carId: number;
    customerId: number;

    make: string;
    model: string;
    year: number;

    plateNumber: string;
    engineNumber: string;
    bodyNumber: string;
}

export interface CreateCarDto {
    customerId: number;

    make: string;
    model: string;
    year: number;

    plateNumber: string;
    engineNumber: string;
    bodyNumber: string;
}

export interface UpdateCarDto {
    make?: string;
    model?: string;
    year?: number;

    plateNumber?: string;
    engineNumber?: string;
    bodyNumber?: string;
}

export interface filterCarDto {
    search?:string
}   