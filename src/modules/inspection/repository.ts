import Inspeciton from "./model";
import Customer from "../customer/model";
import Car from "../car/model";

import { CreateInspectionDto, filterInspectionDto } from "./interface";
import { Transaction } from "sequelize";
import { Op } from "sequelize";
import Inspection from "./model";
class InspecitonRepository {
  async create(data: CreateInspectionDto, transaction?: Transaction) {
    return Inspeciton.create(data, { transaction });
  }

  async findById(InspectionId: number, transaction?: Transaction) {
    return Inspection.findByPk(InspectionId, { transaction });
  }

  // async findByCustomerId(customerId: number, transaction?: Transaction) {
  //   return Inspection.findAll({
  //     where: {
  //       customerId,
  //     },
  //     transaction,
  //   });
  // }
  async findByCarId(carId: number, transaction?: Transaction) {
    return Inspection.findAll({
      where: {
        carId,
      },
      transaction,
    });
  }

  // async findByPhone(phoneNumber: string) {
  //     return Customer.findOne({
  //         where: {
  //             phoneNumber
  //         }
  //     });
  // }

  async getAllInspection(filters: filterInspectionDto) {
    const where = filters.search
      ? {
          //   [Op.or]: [
          //       { make: { [Op.like]: `%${filters.search}%` } },
          //       { model: { [Op.like]: `%${filters.search}%` } },
          //       { bodyNumber: { [Op.like]: `%${filters.search}%` } },
          //       { engineNumber: { [Op.like]: `%${filters.search}%` } },
          //       { plateNumber: { [Op.like]: `%${filters.search}%` } },
          //   ],
        }
      : undefined;

    return Inspection.findAll({
      where,
      include: [
    
        { 
          model: Car,
          as: "car",
          attributes: ["model", "make"],
        },
      ],
    });
  }

  // async update(
  //     carId: number,
  //     data: UpdateCarDto,
  //     transaction?: Transaction
  // ) {

  //     const car = await this.findById(carId, transaction);

  //     if (!car) {
  //         return null;
  //     }

  //     await car.update(data, { transaction });

  //     return car;
  // }

  // async delete(carId: number) {

  //     const car = await this.findById(carId);

  //     if (!car) {
  //         return false;
  //     }

  //    const affectedRows= await car.destroy();

  //     return affectedRows;
  // }
}

export default new InspecitonRepository();
