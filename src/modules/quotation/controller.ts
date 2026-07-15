
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import quotationService from "./service";

class QuotationController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const quotation = await quotationService.createQuotation(req.body);

        res.status(201).json(quotation);

    });

    getQuotations = asyncHandler(async (req: Request, res: Response) => {

        const quotations = await quotationService.getAllQuotations(req.query);
        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ message: "No quotations found" });
        }
        res.status(200).json({message : "Quotations retrieved successfully", quotations});

    });

    addLine = asyncHandler(async (req: Request, res: Response) => {

        const quotationLine = await quotationService.addLine(req.body);
        if (!quotationLine) {
            return res.status(404).json({ message: "failed to add line" });
        }
        res.status(201).json(quotationLine);
    });
    // getQuotationById = asyncHandler(async (req: Request, res: Response) => {

    //     const quotation = await quotationService.getQuotationById(Number(req.params.id));
    //     res.status(200).json({message : "Quotation retrieved successfully", quotation});
    // });


    // update = asyncHandler(async (req: Request, res: Response) => {

    //     const quotation = await quotationService.updateQuotation(Number(req.params.id), req.body); 

    //     res.status(200).json({message : "Quotation updated successfully", quotation});

    // });

    deleteQuotation = asyncHandler(async (req: Request, res: Response) => {

        await quotationService.deleteQuotation(Number(req.params.id));    
        res.status(200).json({ message: "Quotation deleted successfully" });
    });

    deleteLine = asyncHandler(async (req: Request, res: Response) => {

        await quotationService.deleteQuotationLine(Number(req.params.id));    
        res.status(200).json({ message: "Quotation line deleted successfully" });
        
    })
}

export default new QuotationController();