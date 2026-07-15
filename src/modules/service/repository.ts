import Service from "./model";
import {
    CreateServiceDto,
    UpdateServiceDto
} from "./interface";
import { Transaction } from "sequelize";

class ServiceRepository {

    async create(data: CreateServiceDto) {
        return Service.create(data);
    }

    async findById(serviceId: number, transaction?: Transaction) {
        return Service.findByPk(serviceId, { transaction });
    }


    async findAll(transaction?: Transaction) {
        return Service.findAll({ transaction });
    }

    async findByName(name: string, transaction?: Transaction) {
        return Service.findOne({
            where: {name},
            transaction
        });
    }


    async update(
        serviceId: number,
        data: UpdateServiceDto
        , transaction?: Transaction
    ) {

        const service = await this.findById(serviceId, transaction);

        if (!service) {
            return null;
        }

        await service.update(data, { transaction });

        return service;
    }

    async delete(serviceId: number, transaction?: Transaction) {

        const service = await this.findById(serviceId, transaction);

        if (!service) {
            return false;
        }

        await service.destroy();

        return true;
    }

}

export default new ServiceRepository();