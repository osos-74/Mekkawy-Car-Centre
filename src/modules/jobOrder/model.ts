import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from "sequelize";

import sequelize from "../../config/database";

import Quotation from "../quotation/model";
import Customer from "../customer/model";
import Car from "../car/model";

class JobOrder extends Model<
    InferAttributes<JobOrder>,
    InferCreationAttributes<JobOrder>
> {
    declare jobOrderId: CreationOptional<number>;

    declare quotationId: ForeignKey<Quotation["quotationId"]>;

    declare customerId: ForeignKey<Customer["customerId"]>;

    declare carId: ForeignKey<Car["carId"]>;

    declare mileage: number;

    declare customerComplaint: string;

    declare assignedTechnician: CreationOptional<string | null>;

    declare status: CreationOptional<
        "Open" | "In Progress" | "Completed" | "Cancelled"
    >;

    declare notes: CreationOptional<string | null>;

    declare completedAt: CreationOptional<Date | null>;

    declare readonly createdAt: CreationOptional<Date>;

    declare readonly updatedAt: CreationOptional<Date>;
}

JobOrder.init(
    {
        jobOrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "job_order_id",
        },

        quotationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: "quotation_id",
        },


        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        customerComplaint: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            field: "customer_complaint",
        },

        assignedTechnician: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: "assigned_technician",
        },

        status: {
            type: DataTypes.ENUM(
                "Open",
                "In Progress",
                "Completed",
                "Cancelled"
            ),
            defaultValue: "Open",
            allowNull: false,
        },

        notes: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "completed_at",
        },
        createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
},

updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updated_at",
},
    },
    {
        sequelize,
        modelName: "JobOrder",
        tableName: "job_order",
        timestamps: true,
        underscored: true,
    }
);

export default JobOrder;