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
    return carRepository.getAllCars(filter);
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

  async delete(id: number) {
  
    const affectedRows= await carRepository.delete(id);
    if(!affectedRows)
    {
      throw new NotFoundError ("Car Not Found") 
    }
  }

  async getCarByCustomerId(customerId: number,transaction?:Transaction) {
   
      const cars = await carRepository.findByCustomerId(customerId,transaction)
      if (!cars) {
        throw new NotFoundError("No Car found ");
      }
      return cars;
}

}
export default new CarService();
