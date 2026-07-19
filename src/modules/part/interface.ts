export interface PartAttributes {
    partId: number;

    name: string;
    description: string | null;

    sellingPrice: number;
    costPrice: number;

    quantity: number;
    minimumQuantity: number;
}

export interface CreatePartDto {
    name: string;
    description?: string;

    sellingPrice: number;
    costPrice: number;

    quantity: number;
    minimumQuantity?: number;
}

export interface UpdatePartDto {
    name?: string;
    description?: string;

    sellingPrice?: number;
    costPrice?: number;

    quantity?: number;
    minimumQuantity?: number;
}
export interface FilterDto {
    search?: string;
}