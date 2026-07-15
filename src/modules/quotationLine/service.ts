import quotationLineRepository from "./repository";

import quotationRepository from "../quotation/repository";

import partRepository from "../part/repository";

import serviceRepository from "../service/repository";

import {
    CreateQuotationLineDto,
    UpdateQuotationLineDto
} from "./interface";

import {NotFoundError} from "../../common/errors/NotFoundError";
import { Transaction } from "sequelize";

class QuotationLineService {

    async create(data: CreateQuotationLineDto) {

        const quotation =
            await quotationRepository.findById(data.quotationId);

        if (!quotation) {
            throw new NotFoundError("Quotation not found");
        }

        let description = "";
        let unitPrice = 0;
        
        if (data.type === "PART") {

            const part =
                await partRepository.findById(data.partId!);

            if (!part) {
                throw new NotFoundError("Part not found");
            }

            description = part.name;
            unitPrice = Number(part.sellingPrice);

        } else {

            const service =
                await serviceRepository.findById(data.serviceId!);

            if (!service) {
                throw new NotFoundError("Service not found");
            }

            description = service.name;
            unitPrice = Number(service.price);

        }

        const discount = data.discount ?? 0;
        const lineTotal =
            data.quantity * unitPrice - discount;

        return quotationLineRepository.create({

            ...data,

            description,

            unitPrice,

            lineTotal,

            discount

        });

    }

    async getById(id: number) {

        const quotationLine =
            await quotationLineRepository.findById(id);

        if (!quotationLine) {
            throw new NotFoundError("Quotation line not found");
        }

        return quotationLine;

    }

    async getByQuotationId(quotationId: number) {

        return quotationLineRepository.findByQuotationId(
            quotationId
        );

    }

    async update(
        id: number,
        data: UpdateQuotationLineDto
    ) {

        const quotationLine =
            await quotationLineRepository.findById(id);

        if (!quotationLine) {
            throw new NotFoundError("Quotation line not found");
        }

        const quantity =
            data.quantity ?? quotationLine.quantity;

        const discount =
            data.discount ?? quotationLine.discount;

        const lineTotal =
            quantity * Number(quotationLine.unitPrice) - discount;

        return quotationLineRepository.update(id, {

            quantity,

            discount,

            lineTotal

        });

    }

    async delete(id: number, transaction?: Transaction) {

        const quotationLine =
            await quotationLineRepository.findById(id,transaction);

        if (!quotationLine) {
            throw new NotFoundError("Quotation line not found");
        }

        await quotationLineRepository.delete(id, transaction);

    }

}

export default new QuotationLineService();