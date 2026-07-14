import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

class Service extends Model<
    InferAttributes<Service>,
    InferCreationAttributes<Service>
> {

    declare serviceId: CreationOptional<number>;

    declare name: string;

    declare description: CreationOptional<string | null>;

    declare price: number;

    declare estimatedDuration: CreationOptional<number | null>;

    declare isActive: CreationOptional<boolean>;

}

Service.init(
    {
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "service_id",
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        estimatedDuration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "estimated_duration",
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "is_active",
        },
    },
    {
        sequelize,
        modelName: "Service",
        tableName: "service",
        timestamps: true,
        underscored: true,
    }
);

export default Service;