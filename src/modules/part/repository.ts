import Part from "./model";
import { Op } from "sequelize";
import sequelize from "../../config/database";
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

    async findLowStock(transaction?: Transaction) {
    return Part.findAll({
        where: {
            quantity: {
                [Op.lte]: sequelize.col("minimum_quantity"),
            },
        },
        transaction,
    });
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