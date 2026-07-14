import Part from "./model";
import {
    CreatePartDto,
    UpdatePartDto
} from "./interface";

class PartRepository {

    async create(data: CreatePartDto) {
        return Part.create(data);
    }

    async findById(partId: number) {
        return Part.findByPk(partId);
    }


    async findAll() {
        return Part.findAll();
    }

    async update(
        partId: number,
        data: UpdatePartDto
    ) {

        const part = await this.findById(partId);

        if (!part) {
            return null;
        }

        await part.update(data);

        return part;
    }

    async delete(partId: number) {

        const part = await this.findById(partId);

        if (!part) {
            return false;
        }

        await part.destroy();

        return true;
    }

}

export default new PartRepository();