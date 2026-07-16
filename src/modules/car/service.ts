import { CreateCarDto,filterCarDto } from "./interface";
import carRepository from "./repository";
import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import customerService from "../customer/service"
import  { Transaction }  from "sequelize";
import sequelize from "../../config/database";
class CarService {
  async createCar(data: CreateCarDto) {
    const existing = await carRepository.findByEngineNumber(data.engineNumber);

    if (existing) {
      throw new ConflictError("Engine number already exists");
    }
    

    return carRepository.create(data);
  }

  async getAllCars(filter: filterCarDto) {
    return carRepository.findAll(filter);
  }

  // async getCustomerByPhone(phoneNumber: string) {
  //   return customerRepository.findByPhone(phoneNumber);
  // }

async updateCar(id: number, data: Partial<CreateCarDto>) {
 
    const existingCar = await carRepository.findById(id);
    if (!existingCar) {
      throw new NotFoundError("Car not found");
    }
    
    return await carRepository.update(id, data);
 
}
  // async deleteCustomer(id: number) {
  //   const existing = await customerRepository.findById(id);
  //   if (!existing) {
  //     throw new NotFoundError("Customer not found");
  //   }
  //   return customerRepository.delete(existing.customerId);
  // }

//   async getCarByPhone(phoneNumber: string) {
//     const customer = await customerService.getCustomerByPhone(phoneNumber);  
//       if (!customer) {
//         throw new NotFoundError("User Not Registered with this phone number");
//       }
//       const car = await carRepository.findByCustomerId(customer.customerId);
//       if (!car) {
//         throw new NotFoundError("No Car found for the provided phone number");
//       }
//       return car;
// }

}
export default new CarService();
