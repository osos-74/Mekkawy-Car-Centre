import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

class Customer extends Model<
    InferAttributes<Customer>,
    InferCreationAttributes<Customer>
> {

    declare customerId: CreationOptional<number>;

    declare name: string;

    declare phoneNumber: string;

    declare address: string;

}

Customer.init(
    {
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "customer_id",
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: "phone_number",
        },

        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Customer",
        tableName: "customer",
        timestamps: true,
        underscored: true,
    }
);

export default Customer;