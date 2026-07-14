import { CreateServiceDto,
  UpdateServiceDto
 } from "./interface";
import serviceRepository from "./repository";
import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
class ServiceService {
  async createService(data: CreateServiceDto) {
    const serviceWithSameName = await serviceRepository.findByName(data.name);
    if (serviceWithSameName) {
      throw new ConflictError("Service with the same name already exists");
    }
    return serviceRepository.create(data);
  }

  async getAllServices() {
    return serviceRepository.findAll();
  }

  async getServiceById(serviceId: number) {
    return serviceRepository.findById(serviceId);
  }

  async updateService(id: number, data: Partial<UpdateServiceDto>) {
    const existingService = await serviceRepository.findById(id);
    if (!existingService) {
      throw new NotFoundError("Service not found");
    }

    return serviceRepository.update(id, data);
  }
  
  async deleteService(id: number) {
    const existing = await serviceRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Service not found");
    }
    return serviceRepository.delete(existing.serviceId);
  }
}
export default new ServiceService();
