import { Request, Response } from "express";

import { asyncHandler } from "../../common/middleware/asyncHandler";

import quotationLineService from "./service";

class QuotationLineController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const quotationLine =
            await quotationLineService.create(req.body);

        res.status(201).json(quotationLine);

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const quotationLine =
            await quotationLineService.getById(
                Number(req.params.id)
            );

        res.json(quotationLine);

    });

    getByQuotationId = asyncHandler(async (req: Request, res: Response) => {

        const quotationLines =
            await quotationLineService.getByQuotationId(
                Number(req.params.quotationId)
            );

        res.json(quotationLines);

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const quotationLine =
            await quotationLineService.update(
                Number(req.params.id),
                req.body
            );

        res.json(quotationLine);

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await quotationLineService.delete(
            Number(req.params.id)
        );

        res.sendStatus(204);

    });
   

}

export default new QuotationLineController();