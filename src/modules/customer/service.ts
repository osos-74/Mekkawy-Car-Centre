import { CreateCustomerDto } from "./interface";
import customerRepository from "./repository";
import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
class CustomerService {
  async createCustomer(data: CreateCustomerDto) {
    const existing = await customerRepository.findByPhone(data.phoneNumber);

    if (existing) {
      throw new ConflictError("Phone number already exists");
    }

    return customerRepository.create(data);
  }

  async getAllCustomers() {
    return customerRepository.findAll();
  }

  async getCustomerByPhone(phoneNumber: string) {
    return customerRepository.findByPhone(phoneNumber);
  }

  async updateCustomer(id: number, data: Partial<CreateCustomerDto>) {
    const existingCustomer = await customerRepository.findById(id);
    if (!existingCustomer) {
      throw new NotFoundError("Customer not found");
    }
    const existingPhoneNumber = await customerRepository.findByPhone(
      data.phoneNumber!,
    );
    if (existingPhoneNumber && existingPhoneNumber.customerId !== id) {
      throw new ConflictError("Phone number already exists");
    }
    return customerRepository.update(id, data);
  }

  async deleteCustomer(id: number) {
    const existing = await customerRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Customer not found");
    }
    return customerRepository.delete(existing.customerId);
  }
}
export default new CustomerService();
