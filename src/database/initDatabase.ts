import database from "../config/database";
import sequelize from "../config/database";
import "./associations";


import Customer from "../modules/customer/model";


export async function initializeDatabase() {
  try {
    await sequelize.authenticate();

    await sequelize.sync({alter:true});

    console.log("✅ Database initialized");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export {initializeDatabase as initDatabase};