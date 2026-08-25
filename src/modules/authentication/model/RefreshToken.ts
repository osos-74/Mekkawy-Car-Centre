import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import sequelize from "../../../config/database";

class RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare tokenHash: string;
    declare expiresAt: Date;
    declare revokedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "userId"
            },
            onDelete: "CASCADE"
        },

        tokenHash: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        revokedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "refresh_tokens",
        timestamps: true,
        updatedAt: false
    }
);

export default RefreshToken;
