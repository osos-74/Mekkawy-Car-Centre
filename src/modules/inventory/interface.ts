export interface InventoryItem {
    partId: number;
    quantity: number;
}
export interface InventoryAvailability {
    partId: number;
    requestedQuantity: number;
    availableQuantity: number;
    available: boolean;
}