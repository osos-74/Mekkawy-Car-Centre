
import jobOrderRepository from "./repository";
import customerRepository from "../customer/repository";
import partRepository from "../part/repository";
import serviceRepository from "../service/repository";
import quotationLineRepository from "../quotationLine/repository";
import sequelize from "../../config/database";
import carRepository from "../car/repository";

import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { CreateJobOrderDto,JobOrderStatus ,CreateJobOrderData} from "../jobOrder/interface";
import { Transaction } from "sequelize";
import partService from "../part/service";
import serviceService from "../service/service";
import inventoryService from "../inventory/service";
import quotationService from "../quotation/service";
import { QuotationAttributes } from "../quotation/interface";

class JobOrderService {
  async createJobOrder(data: CreateJobOrderDto,transaction?:Transaction) {
   
    const jobOrderData: CreateJobOrderData = {
    ...data,
    customerComplaint: "complaints",
    status: "Open",
};
 
    return jobOrderRepository.create(jobOrderData,transaction);
  }

  // async getAllQuotations(filter: Partial<FilterQuotationDto>) {
  //   return quotationRepository.findAll(filter);
  // }

  // async getQuotationById(quotationId: number, transaction?: Transaction) {
  //   return quotationRepository.findById(quotationId, transaction);
  // }

  // async updateInfo(quotationId: number, data: UpdateQuotationDto) {
  //   return sequelize.transaction(async (transaction) => {
  //     const quotation = await quotationRepository.findById(
  //       quotationId,
  //       transaction,
  //     );

  //     if (!quotation) {
  //       throw new NotFoundError("Quotation not found");
  //     }

  //     await quotationRepository.update(quotation, data, transaction);

  //     // Only recalculate if the quotation discount changed
  //     if (data.discount !== undefined) {
  //       await this.recalculateTotals(quotationId, transaction);
  //     }

  //     return quotationRepository.findById(quotationId);
  //   });
  // }

  // async deleteQuotation(id: number) {
  //   return sequelize.transaction(async (transaction) => {
  //     const existing = await quotationRepository.findById(id, transaction);
  //     if (!existing) {
  //       throw new NotFoundError("Quotation not found");
  //     }
  //     const lines = await quotationLineRepository.findByQuotationId(
  //       existing.quotationId,
  //       transaction,
  //     );
  //     for (const line of lines) {
  //       await quotationLineRepository.delete(line.quotationLineId, transaction);
  //     }
  //     return quotationRepository.delete(existing.quotationId, transaction);
  //   });
  // }

  // private async recalculateTotals(
  //   quotationId: number,
  //   transaction: Transaction,
  // ) {
  //   const quotation = await quotationRepository.findById(
  //     quotationId,
  //     transaction,
  //   );

  //   if (!quotation) {
  //     throw new NotFoundError("Quotation not found");
  //   }

  //   const quotationLines = await quotationLineRepository.findByQuotationId(
  //     quotationId,
  //     transaction,
  //   );

  //   if (quotationLines.length === 0) {
  //     console.log("quotationLine length", quotationLines.length);
  //     const total = 0,
  //       subtotal = 0;
  //     await quotationRepository.updateTotals(
  //       quotation,
  //       subtotal,
  //       total,
  //       transaction,
  //     );
  //   }

  //   const subtotal = quotationLines.reduce(
  //     (sum, line) => sum + Number(line.lineTotal),
  //     0,
  //   );

  //   const total = subtotal - Number(quotation.discount);
  //   if (total < 0) {
  //     throw new ConflictError("Total cannot be negative");
  //   }
  //   await quotationRepository.updateTotals(
  //     quotation,
  //     subtotal,
  //     total,
  //     transaction,
  //   );
  // }
  // async getItem(dto: CreateQuotationLineDto, transaction?: Transaction) {
  //   if (dto.partId) {
  //     const part = await partService.getPartById(dto.partId, transaction);
  //     if (!part) {
  //       throw new NotFoundError("Part not found");
  //     }
  //     return {
  //       type: "part" as const,
  //       item: part,
  //       description: part.name,
  //       unitPrice: Number(part.sellingPrice),
  //     };
  //   }

  //   const service = await serviceService.getServiceById(
  //     dto.serviceId!,
  //     transaction,
  //   );

  //   if (!service) {
  //     throw new NotFoundError("Service not found");
  //   }

  //   return {
  //     type: "service" as const,
  //     item: service,
  //     description: service.name,
  //     unitPrice: Number(service.price),
  //   };
  // }

  // async addLine(dto: CreateQuotationLineDto) {
  //   return sequelize.transaction(async (transaction) => {
  //     // 1. Find quotation
  //     const quotation = await this.getQuotationById(
  //       dto.quotationId,
  //       transaction,
  //     );

  //     if (!quotation) {
  //       throw new NotFoundError("Quotation not found");
  //     }

  //     // 2. Load part or service
  //     const itemData = await this.getItem(dto, transaction);

  //     // 3. Create quotation line
  //     const discount = dto.discount ?? 0;
  //     const isPart = itemData.type === "part";

  //     const existingLine = await quotationLineRepository.findMatchingLine(
  //       dto.quotationId,
  //       isPart ? "PART" : "SERVICE",
  //       isPart ? dto.partId : undefined,
  //       isPart ? undefined : dto.serviceId,
  //       discount,
  //       transaction,
  //     );
  //     if (existingLine) {
  //       console.log("Found existing line:", existingLine);
  //       console.log("Existing quantity:", existingLine.quantity);
  //       console.log("Adding quantity:", dto.quantity);
  //       const newQuantity = Number(existingLine.quantity) + dto.quantity;
  //       console.log("new quantity:", existingLine.quantity);
  //       existingLine.lineTotal =
  //         existingLine.quantity * itemData.unitPrice - discount;
  //       await quotationLineRepository.update(
  //         existingLine.quotationLineId,
  //         {
  //           quantity: newQuantity,
  //           lineTotal: existingLine.lineTotal,
  //         },
  //         transaction,
  //       );
  //     } else {
  //       await quotationLineRepository.create(
  //         {
  //           ...dto,
  //           description: itemData.description,
  //           unitPrice: itemData.unitPrice,
  //           lineTotal: dto.quantity * itemData.unitPrice - discount,
  //         },
  //         transaction,
  //       );
  //     }

  //     // 4. Update quotation subtotal & total
  //     await this.recalculateTotals(dto.quotationId, transaction);

  //     // 5. Return updated quotation
  //     return quotationRepository.findById(dto.quotationId, transaction);
  //   });
  // }
  // async deleteQuotationLine(quotationLineId: number) {
  //   return sequelize.transaction(async (transaction) => {
  //     // After deleting the line, recalculate totals for the associated quotation
  //     const quotationLine = await quotationLineRepository.findById(
  //       quotationLineId,
  //       transaction,
  //     );

  //     console.log(quotationLine?.quotationId, "quotationId");
  //     if (!quotationLine) {
  //       throw new NotFoundError("Quotation line not found");
  //     }
  //     await quotationLineRepository.delete(quotationLineId, transaction);
  //     if (quotationLine?.quotationId) {
  //       await this.recalculateTotals(quotationLine.quotationId, transaction);
  //     }
  //   });
  // }
  // async approveQuotation(quotationId: number) {

  //   return sequelize.transaction(async (transaction) => {

  //     const quotation = await this.getQuotationById(quotationId);
  //     if (!quotation) throw new NotFoundError("Quotation Not Found");

  //     const quotationLines =
  //       await quotationLineRepository.findByQuotationId(quotationId);

  //     const items = quotationLines
  //       .filter((line) => line.partId)
  //       .map((line) => ({
  //         partId: line.partId!,
  //         quantity: line.quantity,
  //       }));

  //     inventoryService.consumeParts(items, transaction);
      
  //   });
  // }
}
export default new JobOrderService();
