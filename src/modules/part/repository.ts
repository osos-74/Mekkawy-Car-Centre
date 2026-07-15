import Part from "./model";
import {
    CreatePartDto,
    UpdatePartDto
} from "./interface";
import { Transaction } from "sequelize";
class PartRepository {

    async create(data: CreatePartDto) {
        return Part.create(data);
    }

    async findById(partId: number, transaction?: Transaction) {
        return Part.findByPk(partId, { transaction });
    }


    async findAll(transaction?: Transaction) {
        return Part.findAll({ transaction });
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