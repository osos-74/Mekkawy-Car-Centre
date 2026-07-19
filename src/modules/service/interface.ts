export interface ServiceAttributes {
    serviceId: number;

    name: string;
    description: string | null;

    price: number;

    estimatedDuration: number | null;

    isActive: boolean;
}

export interface CreateServiceDto {
    name: string;

    description?: string;

    price: number;

    estimatedDuration?: number;

    isActive?: boolean;
}

export interface UpdateServiceDto {
    name?: string;

    description?: string;

    price?: number;

    estimatedDuration?: number;

    isActive?: boolean;
}   