import Quotation from "./model";
import {
    CreateQuotationDto,
    UpdateQuotationDto
} from "./interface";

class QuotationRepository {

    async create(data: CreateQuotationDto) {
        return Quotation.create(data);
    }

    async findById(quotationId: number) {
        return Quotation.findByPk(quotationId);
    }


    async findAll() {
        return Quotation.findAll();
    }

  
    async update(
        quotationId: number,
        data: UpdateQuotationDto
    ) {

        const quotation = await this.findById(quotationId);

        if (!quotation) {
            return null;
        }

        await quotation.update(data);

        return quotation;
    }

    async delete(quotationId: number) {

        const quotation = await this.findById(quotationId);

        if (!quotation) {
            return false;
        }

        await quotation.destroy();

        return true;
    }

}

export default new QuotationRepository();