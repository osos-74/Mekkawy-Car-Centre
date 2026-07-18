import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";
import sequelize from "../../config/database";

export type InvoiceStatus = "Unpaid" | "Partially Paid" | "Paid" | "Cancelled";

class Invoice extends Model<
  InferAttributes<Invoice>,
  InferCreationAttributes<Invoice>
> {
  declare invoiceId: CreationOptional<number>;

  declare quotationId: number;

  declare invoiceNumber: string;

  declare status: CreationOptional<InvoiceStatus>;

  declare issuedAt: CreationOptional<Date>;

  declare paidAt: Date | null;

  declare notes: string | null;

  declare createdAt: NonAttribute<Date>;
  declare updatedAt: NonAttribute<Date>;
}

Invoice.init(
  {
    invoiceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "invoice_id",
    },

    quotationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "quotation_id",
    },

    invoiceNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: "invoice_number",
    },

    status: {
      type: DataTypes.ENUM("Unpaid", "Partially Paid", "Paid", "Cancelled"),
      allowNull: false,
      defaultValue: "Unpaid",
    },

    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "issued_at",
    },

    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "paid_at",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "invoice",
    timestamps: true,
    underscored: true,
  },
);

export default Invoice;
