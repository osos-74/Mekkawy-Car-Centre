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

class Inspection extends Model<
    InferAttributes<Inspection>,
    InferCreationAttributes<Inspection>
> {

    declare inspectionId: CreationOptional<number>;

    declare carId: ForeignKey<Car["carId"]>;

    declare mileage: number;

    declare notes: string;

}

Inspection.init(
    {
        inspectionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "inspection_id",
        },

        
            carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "car_id",
            references: {
                model: Car,
                key: "car_id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },

        notes: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

      

        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

      
    },
    {
        sequelize,
        modelName: "Inspection",
        tableName: "inspection",
        timestamps: true,
        underscored: true,
    }
);

export default Inspection;