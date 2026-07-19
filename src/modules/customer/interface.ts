export interface CustomerAttributes {
    customerId: number;
    name: string;
    phoneNumber: string;
    address: string;
}

export interface CreateCustomerDto {
    name: string;
    phoneNumber: string;
    address: string;
}

export interface UpdateCustomerDto {
    name?: string;
    phoneNumber?: string;
    address?: string;
}
export interface CustomerFilterDto {
  name?: string;
  phone?: string;
  address?: string;
}