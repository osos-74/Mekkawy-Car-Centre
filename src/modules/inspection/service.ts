import { CreateInspectionDto,filterInspectionDto } from "./interface";
import InspectionRepository from "./repository";
import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import customerService from "../customer/service"
import  { Transaction }  from "sequelize";
import sequelize from "../../config/database";
class InspectionService {
  async createInspection(data: CreateInspectionDto) {



    return InspectionRepository.create(data);
  }

  async getAllInspections(filter: filterInspectionDto) {
    return InspectionRepository.getAllInspection(filter);
  }

  // async getCustomerByPhone(phoneNumber: string) {
  //   return customerRepository.findByPhone(phoneNumber);
  // }

// async updateCar(id: number, data: Partial<CreateCarDto>) {
 
//     const existingCar = await carRepository.findById(id);
//     if (!existingCar) {
//       throw new NotFoundError("Car not found");
//     }
    
//     return await carRepository.update(id, data);
 
// }

//   async delete(id: number) {
  
//     const affectedRows= await carRepository.delete(id);
//     if(!affectedRows)
//     {
//       throw new NotFoundError ("Car Not Found") 
//     }
//   }

  async getInspectionByCustomerId(customerId: number,transaction?:Transaction) {
   
      const inspections = await InspectionRepository.findByCustomerId(customerId,transaction)
      if (!inspections) {
        throw new NotFoundError("No Inspections for this customer");
      }
      return inspections;
}
  async getInspectionByCarId(carId: number,transaction?:Transaction) {
   
      const inspections = await InspectionRepository.findByCarId(carId,transaction)
      if (!inspections) {
        throw new NotFoundError("No Inspections for this car");
      }
      return inspections;
}

}
export default new InspectionService();
