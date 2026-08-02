import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

import {
    EmployeeRole,
    EmployeeStatus
} from "./interface";

class Employee extends Model<
    InferAttributes<Employee>,
    InferCreationAttributes<Employee>
> {

    declare employeeId: CreationOptional<number>;

    declare employeeNumber: string;

    declare firstName: string;
    declare lastName: string;

    declare phoneNumber: string;
    declare email: CreationOptional<string | null>;
    declare address: CreationOptional<string | null>;

    declare role: EmployeeRole;
    declare status: CreationOptional<EmployeeStatus>;

    declare salary: CreationOptional<number | null>;

    declare hireDate: Date;

    declare notes: CreationOptional<string | null>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Employee.init(
    {
        employeeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "employee_id",
        },

        employeeNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "employee_number",
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "first_name",
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "last_name",
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "phone_number",
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        role: {
            type: DataTypes.ENUM(...Object.values(EmployeeRole)),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(...Object.values(EmployeeStatus)),
            allowNull: false,
            defaultValue: EmployeeStatus.ACTIVE,
        },

        salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        hireDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "hire_date",
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        modelName: "Employee",
        tableName: "employee",
        timestamps: true,
    }
);

export default Employee;