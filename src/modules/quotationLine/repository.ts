import QuotationLine from "./model";

import {
    CreateQuotationLineDto,
    UpdateQuotationLineDto,
} from "./interface";
import { Transaction } from "sequelize";


class QuotationLineRepository {

    async create(data: CreateQuotationLineDto & {
        description: string;
        unitPrice: number;
        lineTotal: number;
    },transaction?: Transaction) {

        return QuotationLine.create(data, { transaction });

    }

    async findById(id: number,transaction?: Transaction) {

        return QuotationLine.findByPk(id, { transaction });

    }

    async findByQuotationId(quotationId: number,transaction?: Transaction
    ) {

        return QuotationLine.findAll({
            where: {
                quotationId,
            },
            order: [["quotationLineId", "ASC"]],transaction
        });

    }

    async update(
        id: number,
        data: UpdateQuotationLineDto & {
            lineTotal: number;
        },
        transaction?: Transaction
    ) {

        const quotationLine =
            await QuotationLine.findByPk(id, { transaction });

        if (!quotationLine) {
            return null;
        }

        return quotationLine.update(data, { transaction });

    }

    async delete(id: number,transaction?: Transaction) {

        return QuotationLine.destroy({
            where: {
                quotationLineId: id
            },
            transaction
        });

    }
 async findMatchingLine( 
        quotationId: number,
        type: "PART" | "SERVICE",
        partId?: number,
        serviceId?: number,
        discount?: number,
        transaction?: Transaction
    ) {
        const where: any = {
            quotationId,
            type,
            discount: discount ?? 0
        };

        if (type === "PART") {
            where.partId = partId;
        } else {
            where.serviceId = serviceId;
        }

        return QuotationLine.findOne({
            where,
            transaction,
        });
    }

}

export default new QuotationLineRepository();