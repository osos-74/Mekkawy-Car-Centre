import JobOrder from "./model";
import {
    CreateJobOrderDto,
    CreateJobOrderData
} from "./interface";
import { Transaction } from "sequelize";

class JObOrderRepository {

    async create(data: CreateJobOrderData,transaction?: Transaction) {
        return JobOrder.create(data);
    }

//     async findById(quotationId: number,
//         transaction?: Transaction
// ) {
//         return Quotation.findByPk(quotationId, { transaction });
//     }


//     async findAll(filter: Partial<FilterQuotationDto>,transaction?: Transaction) {
//         return Quotation.findAll({ where: filter, transaction });
//     }

  
//   async update(
//     quotation: Quotation,
//     data: UpdateQuotationDto,
//     transaction?: Transaction
// ) {
//     return quotation.update(data, {
//         transaction,
//     });
// }

// async updateTotals(
//     quotation: Quotation,
//     subtotal: number,
//     total: number,
//     transaction?: Transaction
// ) {
//     return quotation.update(
//         {
//             subtotal,
//             total,
//         },
//         {
//             transaction,
//         }
//     );
// }
//     async delete(quotationId: number,transaction?: Transaction) {

//         const quotation = await this.findById(quotationId, transaction);

//         if (!quotation) {
//             return false;
//         }

//         await quotation.destroy({transaction});

//         return true;
//     }

}

export default new JObOrderRepository();