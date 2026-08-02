import {
    Model,
    ModelStatic,
    CreationAttributes,
    FindOptions,
    UpdateOptions,
    DestroyOptions
} from "sequelize";

export default abstract class BaseRepository<T extends Model> {
    protected constructor(
        protected readonly model: ModelStatic<T>
    ) {}

    async create(data: CreationAttributes<T>): Promise<T> {
        return this.model.create(data);
    }

    async findById(id: number): Promise<T | null> {
        return this.model.findByPk(id);
    }

    async findAll(options?: FindOptions): Promise<T[]> {
        return this.model.findAll(options);
    }

    async update(
        instance: T,
        data: Partial<CreationAttributes<T>>,
        options?: UpdateOptions
    ): Promise<T> {
        return instance.update(data, options);
    }

    async delete(
        instance: T,
        options?: DestroyOptions
    ): Promise<void> {
        await instance.destroy(options);
    }
}