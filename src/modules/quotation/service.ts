import {
  CreateQuotationDto,
  FilterQuotationDto,
  UpdateQuotationDto,
} from "./interface";
import quotationRepository from "./repository";
import customerRepository from "../customer/repository";
import partRepository from "../part/repository";
import serviceRepository from "../service/repository";
import quotationLineRepository from "../quotationLine/repository";
import sequelize from "../../config/database";
import carRepository from "../car/repository";
import carService from "../car/service";
import customerService from "../customer/service";

import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { CreateQuotationLineDto } from "../quotationLine/interface";
import { Transaction } from "sequelize";
import partService from "../part/service";
import serviceService from "../service/service";
import inventoryService from "../inventory/service";

import { QuotationPdfGenerator } from "./pdf/quotationPdfGenerator";
import { QuotationPdfData } from "./pdf/interface";
import { Response } from "express";


class QuotationService {
  async createQuotation(data: CreateQuotationDto) {
    const existing = await customerRepository.findById(data.customerId);
    if (!existing) {
      throw new NotFoundError("Customer not found");
    }
    const existingCar = await carRepository.findById(data.carId);
    if (!existingCar) {
      throw new NotFoundError("Car not found");
    }
    return quotationRepository.create(data);
  }

  async getAllQuotations(filter: Partial<FilterQuotationDto>) {
    return quotationRepository.findAll(filter);
  }

  async getQuotationById(quotationId: number, transaction?: Transaction) {
    return quotationRepository.findById(quotationId, transaction);
  }

  async updateInfo(
    quotationId: number,
    data: UpdateQuotationDto,
    transaction?: Transaction,
  ) {
    return sequelize.transaction(async (transaction) => {
      const quotation = await quotationRepository.findById(
        quotationId,
        transaction,
      );

      if (!quotation) {
        throw new NotFoundError("Quotation not found");
      }

      await quotationRepository.update(quotation, data, transaction);

      // Only recalculate if the quotation discount changed
      if (data.discount !== undefined) {
        await this.recalculateTotals(quotationId, transaction);
      }

      return quotationRepository.findById(quotationId);
    });
  }

  async deleteQuotation(id: number) {
    return sequelize.transaction(async (transaction) => {
      const existing = await quotationRepository.findById(id, transaction);
      if (!existing) {
        throw new NotFoundError("Quotation not found");
      }
      const lines = await quotationLineRepository.findByQuotationId(
        existing.quotationId,
        transaction,
      );
      for (const line of lines) {
        await quotationLineRepository.delete(line.quotationLineId, transaction);
      }
      return quotationRepository.delete(existing.quotationId, transaction);
    });
  }

  private async recalculateTotals(
    quotationId: number,
    transaction: Transaction,
  ) {
    const quotation = await quotationRepository.findById(
      quotationId,
      transaction,
    );

    if (!quotation) {
      throw new NotFoundError("Quotation not found");
    }

    const quotationLines = await quotationLineRepository.findByQuotationId(
      quotationId,
      transaction,
    );

    if (quotationLines.length === 0) {
      console.log("quotationLine length", quotationLines.length);
      const total = 0,
        subtotal = 0;
      await quotationRepository.updateTotals(
        quotation,
        subtotal,
        total,
        transaction,
      );
    }

    const subtotal = quotationLines.reduce(
      (sum, line) => sum + Number(line.lineTotal),
      0,
    );

    const total = subtotal - Number(quotation.discount);
    if (total < 0) {
      throw new ConflictError("Total cannot be negative");
    }
    await quotationRepository.updateTotals(
      quotation,
      subtotal,
      total,
      transaction,
    );
  }
  async getItem(dto: CreateQuotationLineDto, transaction?: Transaction) {
    if (dto.partId) {
      const part = await partService.getPartById(dto.partId, transaction);
      if (!part) {
        throw new NotFoundError("Part not found");
      }
      return {
        type: "part" as const,
        item: part,
        description: part.name,
        unitPrice: Number(part.sellingPrice),
      };
    }

    const service = await serviceService.getServiceById(
      dto.serviceId!,
      transaction,
    );

    if (!service) {
      throw new NotFoundError("Service not found");
    }

    return {
      type: "service" as const,
      item: service,
      description: service.name,
      unitPrice: Number(service.price),
    };
  }

  async addLine(dto: CreateQuotationLineDto) {
    return sequelize.transaction(async (transaction) => {
      // 1. Find quotation
      const quotation = await this.getQuotationById(
        dto.quotationId,
        transaction,
      );
      if (quotation?.status == "Approved") {
        throw new Error("Can't edit Approved quoatation");
      }
      if (!quotation) {
        throw new NotFoundError("Quotation not found");
      }

      // 2. Load part or service
      const itemData = await this.getItem(dto, transaction);

      // 3. Create quotation line
      const discount = dto.discount ?? 0;
      const isPart = itemData.type === "part";

      const existingLine = await quotationLineRepository.findMatchingLine(
        dto.quotationId,
        isPart ? "PART" : "SERVICE",
        isPart ? dto.partId : undefined,
        isPart ? undefined : dto.serviceId,
        discount,
        transaction,
      );
      if (existingLine) {
        console.log("Found existing line:", existingLine);
        console.log(
          "Existing quantity:",
          existingLine.quantity,
          typeof existingLine.quantity,
        );
        console.log("Adding quantity:", dto.quantity, typeof dto.quantity);

        const newQuantity =
          Number(existingLine.quantity) + Number(dto.quantity);

        console.log("Calculated:", newQuantity, typeof newQuantity);
        existingLine.lineTotal = newQuantity * itemData.unitPrice - discount;
        await quotationLineRepository.update(
          existingLine.quotationLineId,
          {
            quantity: newQuantity,
            lineTotal: existingLine.lineTotal,
          },
          transaction,
        );
      } else {
        await quotationLineRepository.create(
          {
            ...dto,
            description: itemData.description,
            unitPrice: itemData.unitPrice,
            lineTotal: dto.quantity * itemData.unitPrice - discount,
          },
          transaction,
        );
      }

      // 4. Update quotation subtotal & total
      await this.recalculateTotals(dto.quotationId, transaction);

      // 5. Return updated quotation
      return quotationRepository.findById(dto.quotationId, transaction);
    });
  }
  async deleteQuotationLine(quotationLineId: number) {
    return sequelize.transaction(async (transaction) => {
      // After deleting the line, recalculate totals for the associated quotation
      const quotationLine = await quotationLineRepository.findById(
        quotationLineId,
        transaction,
      );

      console.log(quotationLine?.quotationId, "quotationId");
      if (!quotationLine) {
        throw new NotFoundError("Quotation line not found");
      }
      await quotationLineRepository.delete(quotationLineId, transaction);
      if (quotationLine?.quotationId) {
        await this.recalculateTotals(quotationLine.quotationId, transaction);
      }
    });
  }
  async getQuotationPdfData(quotationId: number): Promise<QuotationPdfData> {
    const quotation = await quotationRepository.findById(quotationId);

    if (!quotation) {
      throw new NotFoundError("Quotation not found");
    }

    const customer = await customerService.getCustomerById(
      quotation.customerId,
    );
    if (!customer) throw new NotFoundError("Customer not found");

    const car = await carRepository.findById(quotation.carId);
    if (!car) throw new NotFoundError("Car not found");
    const quotationLines =
      await quotationLineRepository.findByQuotationId(quotationId);
    if (!quotationLines) throw new NotFoundError("Quotation Lines not found");
    return {
      quotation: quotation.toJSON(),
      customer: customer.toJSON(),
      car: car.toJSON(),
      quotationLines: quotationLines.map((line) => line.toJSON()),
    };
  }
  async generateQuotationpdf(quotationId: number,res:Response) {
    const generator = new QuotationPdfGenerator();
    const pdfData = await this.getQuotationPdfData(quotationId);
    if (!pdfData) {
      throw new NotFoundError("Quotation PDf Data not found");
    }

    const { pdf, filename } = await generator.generate(pdfData);
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    pdf.pipe(res);
    pdf.end();
  }
  async approveQuotation(quotationId: number) {
    //add jobOrderData parameter to this function
    return sequelize.transaction(async (transaction) => {
      const quotation = await this.getQuotationById(quotationId, transaction);
      if (!quotation) throw new NotFoundError("Quotation Not Found");

      const quotationLines = await quotationLineRepository.findByQuotationId(
        quotationId,
        transaction,
      );
      if (quotationLines.length === 0)
        throw new NotFoundError("Quotation Lines not found");
      const items = quotationLines
        .filter((line) => line.partId)
        .map((line) => ({
          partId: line.partId!,
          quantity: line.quantity,
        }));

      await inventoryService.consumeParts(items, transaction);
      const jobOrderData = {
        quotationId: quotationId,
        mileage: 100,
        notes: "notes",
        assignedTechnician: "Nasr",
      };
      // const jobOrder = await jobOrderService.createJobOrder(
      //   jobOrderData,
      //   transaction,
      // );
      // console.log(jobOrder)
      // for (const line of quotationLines) {
      //   console.log("at joborderLine repository");

      //   await jobOrderLineRepository.create(
      //     {
      //       jobOrderId:jobOrder.jobOrderId,
      //       type: line.type,
      //       partId: line.partId ?? undefined,
      //       serviceId: line.serviceId ?? undefined,
      //       description: line.description,
      //       quantity: Number(line.quantity),
      //     },
      //     transaction,
      //   );

      // }

      await this.updateInfo(quotationId, { status: "Approved" }, transaction);
    });
  }
}
export default new QuotationService();
