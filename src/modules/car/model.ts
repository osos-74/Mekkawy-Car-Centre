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

class Car extends Model<
    InferAttributes<Car>,
    InferCreationAttributes<Car>
> {

    declare carId: CreationOptional<number>;

    declare customerId: ForeignKey<Customer["customerId"]>;

    declare make: string;

    declare model: string;

    declare year: number;

    declare plateNumber: string;

    declare engineNumber: string;

    declare bodyNumber: string;

    // declare mileage: number;

}

Car.init(
    {
        carId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "car_id",
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "customer_id",
            references: {
                model: Customer,
                key: "customer_id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },

        make: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        model: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plateNumber: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            field: "plate_number",
        },

        engineNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "engine_number",
        },

        bodyNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "body_number",
        },
        //    mileage: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     field: "mileage",
        // },
    },
    {
        sequelize,
        modelName: "Car",
        tableName: "car",
        timestamps: true,
        underscored: true,
    }
);

export default Car;