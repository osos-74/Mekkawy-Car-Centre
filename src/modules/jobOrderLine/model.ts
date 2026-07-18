import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

class JobOrderLine extends Model<
    InferAttributes<JobOrderLine>,
    InferCreationAttributes<JobOrderLine>
> {

    declare jobOrderLineId: CreationOptional<number>;

    declare jobOrderId: number;

    declare type: "PART" | "SERVICE";

    declare partId: number | null;

    declare serviceId: number | null;

    declare description: string;

    declare quantity: number;


}

JobOrderLine.init({

    jobOrderLineId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "job_order_line_id"
    },

    jobOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "job_order_id"
    },

    type: {
        type: DataTypes.ENUM("PART", "SERVICE"),
        allowNull: false
    },

    partId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "part_id"
    },

    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "service_id"
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

   

},{
    sequelize,
    tableName:"job-order_line",
    timestamps:true,
    underscored:true
});

export default JobOrderLine;