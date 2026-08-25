import sequelize from "../config/database";
import "./associations";

import "../modules/user/model";
import "../modules/authentication/model/RefreshToken";
import { seedAdminIfNeeded } from "./seedAdmin";

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();

        await sequelize.sync({});

        await seedAdminIfNeeded();

        console.log("Database initialized");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { initializeDatabase as initDatabase };
