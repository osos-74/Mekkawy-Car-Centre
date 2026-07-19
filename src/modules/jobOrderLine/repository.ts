import JobOrderLine from "./model";

import {
    CreateJobOrderLineDto,
    UpdateJobOrderLineDto,
} from "./interface";
import { Transaction } from "sequelize";


class JobOrderLineRepository {

    async create(data: CreateJobOrderLineDto ,transaction?: Transaction) {
        console.log("at joborderLine repository")

        return JobOrderLine.create(data, { transaction });

    }

//     async findById(id: number,transaction?: Transaction) {

//         return JobOrderLine.findByPk(id, { transaction });

//     }

//     async findByQuotationId(quotationId: number,transaction?: Transaction
//     ) {

//         return JobOrderLine.findAll({
//             where: {
//                 quotationId,
//             },
//             order: [["quotationLineId", "ASC"]],transaction
//         });

//     }

//     async update(
//         id: number,
//         data: UpdateJobOrderLineDto & {
//             lineTotal: number;
//         },
//         transaction?: Transaction
//     ) {

//         const quotationLine =
//             await JobOrderLine.findByPk(id, { transaction });

//         if (!quotationLine) {
//             return null;
//         }

//         return quotationLine.update(data, { transaction });

//     }

//     async delete(id: number,transaction?: Transaction) {

//         return JobOrderLine.destroy({
//             where: {
//                 quotationLineId: id
//             },
//             transaction
//         });

//     }
//  async findMatchingLine( 
//         quotationId: number,
//         type: "PART" | "SERVICE",
//         partId?: number,
//         serviceId?: number,
//         discount?: number,
//         transaction?: Transaction
//     ) {
//         const where: any = {
//             quotationId,
//             type,
//             discount: discount ?? 0
//         };

//         if (type === "PART") {
//             where.partId = partId;
//         } else {
//             where.serviceId = serviceId;
//         }

//         return QuotationLine.findOne({
//             where,
//             transaction,
//         });
//     }

}

export default new JobOrderLineRepository();