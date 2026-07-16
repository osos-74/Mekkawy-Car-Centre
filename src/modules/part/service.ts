import { CreatePartDto, UpdatePartDto } from "./interface";
import partRepository from "./repository";
import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Transaction } from "sequelize";

class PartService {
  async createPart(data: CreatePartDto) {
    return partRepository.create(data);
  }

  async getAllParts() {
    return partRepository.findAll();
  }

  async getPartById(partId: number, transaction?: Transaction) {
    return partRepository.findById(partId, transaction);
  }

  async updatePart(id: number, data: Partial<UpdatePartDto>) {
    const existingPart = await partRepository.findById(id);
    if (!existingPart) {
      throw new NotFoundError("Part not found");
    }

    return partRepository.update(id, data);
  }

  async deletePart(id: number) {
    const existing = await partRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Part not found");
    }
    return partRepository.delete(existing.partId);
  }
  async updateQuantity(id: number, quantity: number,transaction?: Transaction) {
    const existingPart = await partRepository.findById(id);

    if (!existingPart) {
      throw new NotFoundError("Part not found");
    }

    return partRepository.update(id, {quantity});
  }
}
export default new PartService();
