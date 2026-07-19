import Part from "./model";
import {
    CreatePartDto,
    UpdatePartDto,
    FilterDto,
} from "./interface";
import { Transaction,Op } from "sequelize";
class PartRepository {

    async create(data: CreatePartDto) {
        return Part.create(data);
    }

    async findById(partId: number, transaction?: Transaction) {
        return Part.findByPk(partId, { transaction });
    }


    async findAll(filters:FilterDto,transaction?: Transaction) {
         const where = filters.search
        ? {
              [Op.or]: [
                  {
                      name: {
                          [Op.like]: `%${filters.search}%`,
                      },
                  },
                  {
                      description: {
                          [Op.like]: `%${filters.search}%`,
                      },
                  },
                
              ],
          }
        : undefined;

    
        return Part.findAll({where, transaction });
    }

    async update(
        partId: number,
        data: UpdatePartDto,
        transaction?: Transaction
    ) {

        const part = await this.findById(partId, transaction);

        if (!part) {
            return null;
        }

        await part.update(data, { transaction });

        return part;
    }

    async delete(partId: number, transaction?: Transaction) {

        const part = await this.findById(partId, transaction);

        if (!part) {
            return false;
        }

        await part.destroy();

        return true;
    }

}

export default new PartRepository();