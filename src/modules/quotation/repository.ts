import Service from "./model";
import {
    CreateServiceDto,
    UpdateServiceDto
} from "./interface";

class ServiceRepository {

    async create(data: CreateServiceDto) {
        return Service.create(data);
    }

    async findById(serviceId: number) {
        return Service.findByPk(serviceId);
    }


    async findAll() {
        return Service.findAll();
    }

    async findByName(name: string) {
        return Service.findOne({
            where: {name}
        });
    }


    async update(
        serviceId: number,
        data: UpdateServiceDto
    ) {

        const service = await this.findById(serviceId);

        if (!service) {
            return null;
        }

        await service.update(data);

        return service;
    }

    async delete(serviceId: number) {

        const service = await this.findById(serviceId);

        if (!service) {
            return false;
        }

        await service.destroy();

        return true;
    }

}

export default new ServiceRepository();