import Customer from "./model";
import {
    CreateCustomerDto,
    UpdateCustomerDto
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

    async findAll() {
        return Customer.findAll();
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