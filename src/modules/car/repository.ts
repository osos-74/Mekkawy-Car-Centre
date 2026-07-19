import Car from "./model";
import Customer from "../customer/model";
import {
    CreateCarDto,
    UpdateCarDto,
    filterCarDto
} from "./interface";
import { Transaction } from "sequelize";
import { Op } from "sequelize";
class CarRepository {

    async create(data: CreateCarDto, transaction?: Transaction) {
        return Car.create(data, { transaction });
    }

    async findByEngineNumber(engineNumber: string, transaction?: Transaction) {
        return Car.findOne({
            where: {
                engineNumber
            },
            transaction
        });
    }
    async findById(carId: number, transaction?: Transaction) {
        return Car.findByPk(carId, { transaction });
    }

    async findByCustomerId(customerId: number, transaction?: Transaction) {
        return Car.findAll({
            where: {
                customerId
            },
            transaction
        });
    }

    // async findByPhone(phoneNumber: string) {
    //     return Customer.findOne({
    //         where: {
    //             phoneNumber
    //         }
    //     });
    // }

    
      async getAllCars(filters: filterCarDto) {
    const where = filters.search
        ? {
              [Op.or]: [
                  { make: { [Op.like]: `%${filters.search}%` } },
                  { model: { [Op.like]: `%${filters.search}%` } },
                  { bodyNumber: { [Op.like]: `%${filters.search}%` } },
                  { engineNumber: { [Op.like]: `%${filters.search}%` } },
                  { plateNumber: { [Op.like]: `%${filters.search}%` } },
              ],
          }
        : undefined;

    return Car.findAll({
        where,
        include: [{ model: Customer, as: "customer", attributes: ["name", "phoneNumber"] }],
    });
}

    async update(
        carId: number,
        data: UpdateCarDto,
        transaction?: Transaction
    ) {

        const car = await this.findById(carId, transaction);

        if (!car) {
            return null;
        }

        await car.update(data, { transaction });

        return car;
    }

    async delete(carId: number) {

        const car = await this.findById(carId);

        if (!car) {
            return false;
        }

       const affectedRows= await car.destroy();

        return affectedRows;
    }

}

export default new CarRepository();