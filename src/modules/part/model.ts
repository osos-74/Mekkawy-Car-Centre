import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import sequelize from "../../config/database";

class Part extends Model<
    InferAttributes<Part>,
    InferCreationAttributes<Part>
> {

    declare partId: CreationOptional<number>;

    declare name: string;

    declare description: CreationOptional<string | null>;

    declare sellingPrice: number;

    declare costPrice: number;

    declare quantity: number;

    declare minimumQuantity: CreationOptional<number>;
}

Part.init(
    {
        partId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "part_id",
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        sellingPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "selling_price",
        },

        costPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "cost_price",
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        minimumQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            field: "minimum_quantity",
        },
    },
    {
        sequelize,
        modelName: "Part",
        tableName: "part",
        timestamps: true,
        underscored: true,
    }
);

export default Part;