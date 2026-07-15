import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey
} from "sequelize";

import sequelize from "../../config/database";

import Customer from "../customer/model";
import Car from "../car/model";

class Quotation extends Model<
    InferAttributes<Quotation>,
    InferCreationAttributes<Quotation>
> {

    declare quotationId: CreationOptional<number>;

    declare customerId: ForeignKey<Customer["customerId"]>;

    declare carId: ForeignKey<Car["carId"]>;

    declare subtotal: CreationOptional<number>;

    declare discount: CreationOptional<number>;

    declare total: CreationOptional<number>;

    declare status: CreationOptional<
        "Draft" | "Approved" | "Rejected" | "Expired"
    >;

    declare notes: CreationOptional<string | null>;

}

Quotation.init(
    {
        quotationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "quotation_id",
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "customer_id",
        },

        carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "car_id",
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        status: {
            type: DataTypes.ENUM(
                "Draft",
                "Approved",
                "Rejected",
                "Expired"
            ),
            allowNull: false,
            defaultValue: "Draft",
        },

        notes: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Quotation",
        tableName: "quotation",
        timestamps: true,
        underscored: true,
    }
);

export default Quotation;