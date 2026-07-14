import Car from "./model";
import {
    CreateCarDto,
    UpdateCarDto
} from "./interface";

class CarRepository {

    async create(data: CreateCarDto) {
        return Car.create(data);
    }

    async findByEngineNumber(engineNumber: string) {
        return Car.findOne({
            where: {
                engineNumber
            }
        });
    }
    async findById(carId: number) {
        return Car.findByPk(carId);
    }

    async findByCustomerId(customerId: number) {
        return Car.findAll({
            where: {
                customerId
            }
        });
    }

    // async findByPhone(phoneNumber: string) {
    //     return Customer.findOne({
    //         where: {
    //             phoneNumber
    //         }
    //     });
    // }

    // async findAll() {
    //     return Customer.findAll();
    // }

    async update(
        carId: number,
        data: UpdateCarDto
    ) {

        const car = await this.findById(carId);

        if (!car) {
            return null;
        }

        await car.update(data);

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