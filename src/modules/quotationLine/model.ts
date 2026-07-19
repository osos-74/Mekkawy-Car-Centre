import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

class QuotationLine extends Model<
    InferAttributes<QuotationLine>,
    InferCreationAttributes<QuotationLine>
> {

    declare quotationLineId: CreationOptional<number>;

    declare quotationId: number;

    declare type: "PART" | "SERVICE";

    declare partId: number | null;

    declare serviceId: number | null;

    declare description: string;

    declare quantity: number;

    declare unitPrice: number;

declare discount: CreationOptional<number>;
    declare lineTotal: number;

}

QuotationLine.init({

    quotationLineId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "quotation_line_id"
    },

    quotationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "quotation_id"
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

    unitPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        field: "unit_price"
    },

    discount: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },

    lineTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        field: "line_total"
    }

},{
    sequelize,
    tableName:"quotation_line",
    timestamps:true,
    underscored:true
});

export default QuotationLine;