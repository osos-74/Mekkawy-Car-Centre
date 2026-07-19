import sequelize from "../../config/database";
import { initDatabase } from "../../database/initDatabase";
import quotionService from "./service";

async function main() {
    try {
        await initDatabase()
        await sequelize.authenticate();

        await quotionService.approveQuotation(
            
                5
            
        );

        console.log("Quotation Approved successfully.");
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

main();
