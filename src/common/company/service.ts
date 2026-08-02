
import fs from "fs/promises";
import path from "path";

const companyPath = path.resolve(
    process.cwd(),
    "src/common/company/company.json"
);
class CompanyService {

    async getCompany() {

        const data = await fs.readFile(companyPath, "utf-8");

        return JSON.parse(data);
    }

    async updateCompany(updateData: any) {

        const company = await this.getCompany();

        const updatedCompany = {
            ...company,
            ...updateData,
        };

        await fs.writeFile(
            companyPath,
            JSON.stringify(updatedCompany, null, 2)
        );

        return updatedCompany;
    }

}

export default new CompanyService();