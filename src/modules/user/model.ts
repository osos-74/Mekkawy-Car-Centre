import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../config/database";

export enum UserRole {
    ADMIN = "ADMIN",
    SERVICE_ADVISOR = "SERVICE_ADVISOR",
    TECHNICIAN = "TECHNICIAN",
    CASHIER = "CASHIER"
}

class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare userId: CreationOptional<number>;

    declare name: string;

    declare email: string;

    declare passwordHash: string;

    declare role: UserRole;

    declare isActive: CreationOptional<boolean>;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.SERVICE_ADVISOR
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ["passwordHash"]
            }
        }
    }
);

export default User;