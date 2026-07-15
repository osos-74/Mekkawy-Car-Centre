import Car from "./model";
import {
    CreateCarDto,
    UpdateCarDto,
    filterCarDto
} from "./interface";
import { Transaction } from "sequelize";
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

    async findAll(filter: Partial<filterCarDto>, transaction?: Transaction) {
        return Car.findAll({ where: filter, transaction });
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

    // async delete(customerId: number) {

    //     const customer = await this.findById(customerId);

    //     if (!customer) {
    //         return false;
    //     }

    //     await customer.destroy();

    //     return true;
    // }

}

export default new CarRepository();