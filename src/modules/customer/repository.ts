import Customer from "./model";
import { Op } from "sequelize";
import {
    CreateCustomerDto,
    UpdateCustomerDto,
    CustomerFilterDto

} from "./interface";

class CustomerRepository {

    async create(data: CreateCustomerDto) {
        return Customer.create(data);
    }

    async findById(customerId: number) {
        return Customer.findByPk(customerId);
    }

    async findByPhone(phoneNumber: string) {
        return Customer.findOne({
            where: {
                phoneNumber
            }
        });
    }

  async getAllCustomers(filters: CustomerFilterDto) {
    const where = filters.search
        ? {
              [Op.or]: [
                  {
                      name: {
                          [Op.like]: `%${filters.search}%`,
                      },
                  },
                  {
                      phoneNumber: {
                          [Op.like]: `%${filters.search}%`,
                      },
                  },
                  {
                      address: {
                          [Op.like]: `%${filters.search}%`,
                      },
                  },
              ],
          }
        : undefined;

    return Customer.findAll({ where });
}

    async update(
        customerId: number,
        data: UpdateCustomerDto
    ) {

        const customer = await this.findById(customerId);

        if (!customer) {
            return null;
        }

        await customer.update(data);

        return customer;
    }

    async delete(customerId: number) {

        const customer = await this.findById(customerId);

        if (!customer) {
            return false;
        }

        await customer.destroy();

        return true;
    }

}

export default new CustomerRepository();