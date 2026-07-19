import sequelize from "../../config/database";
import inventoryService from "./service";

async function main() {
    try {
        await sequelize.authenticate();

        await inventoryService.restoreParts([
            {
                partId: 1,
                quantity: 20,
            },
        ]);

        console.log("Inventory updated successfully.");
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

main();