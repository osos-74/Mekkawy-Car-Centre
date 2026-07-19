import { Transaction } from "sequelize";

import PartRepository from "../part/repository";
import PartService from "../part/service";

import { InventoryItem, InventoryAvailability } from "./interface";

import { BadRequestError } from "../../common/errors/BadRequestError";
import { NotFoundError } from "../../common/errors/NotFoundError";

class InventoryService {
   private async checkAvailability(
        items: InventoryItem[],
        transaction?: Transaction
    ): Promise<InventoryAvailability[]> {
        const result: InventoryAvailability[] = [];

        for (const item of items) {
            const part = await PartRepository.findById(
                item.partId,
                transaction
            );

            if (!part) {
                throw new NotFoundError(
                    `Part with id ${item.partId} not found`
                );
            }

            result.push({
                partId: item.partId,
                requestedQuantity: item.quantity,
                availableQuantity: Number(part.quantity),
                available: Number(part.quantity) >= item.quantity,
            });
        }

        return result;
    }

    async consumeParts(
        items: InventoryItem[],
        transaction?: Transaction
    ): Promise<void> {
        const availability = await this.checkAvailability(
            items,
            transaction
        );

        const unavailable = availability.find(item => !item.available);

        if (unavailable) {
            throw new BadRequestError(
                `Insufficient stock for part ${unavailable.partId}`
            );
        }

        for (const item of items) {
            const part = await PartRepository.findById(
                item.partId,
                transaction
            );

            if (!part) continue;

            await PartService.updateQuantity(
                part.partId,
                Number(part.quantity) - item.quantity,
                transaction
            );
        }
    }

    async restoreParts(
        items: InventoryItem[],
        transaction?: Transaction
    ): Promise<void> {
        for (const item of items) {
            const part = await PartRepository.findById(
                item.partId,
                transaction
            );

            if (!part) {
                throw new NotFoundError(
                    `Part with id ${item.partId} not found`
                );
            }

            await PartService.updateQuantity(
                part.partId,
                Number(part.quantity) + item.quantity,
                transaction
            );
        }
    }
}

export default new InventoryService();