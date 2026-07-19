
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import partService from "./service";

class PartController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const part = await partService.createPart(req.body);

        res.status(201).json(part);

    });
    
    getParts = asyncHandler(async (req: Request, res: Response) => {
        const filter = req.query
        const parts = await partService.getAllParts(filter);
        res.status(200).json({message : "Parts retrieved successfully", parts});

    });


    getPartById = asyncHandler(async (req: Request, res: Response) => {

        const part = await partService.getPartById(Number(req.params.id));
        res.status(200).json({message : "Part retrieved successfully", part});
    });


    update = asyncHandler(async (req: Request, res: Response) => {

        const part = await partService.updatePart(Number(req.params.id), req.body); 

        res.status(200).json({message : "Part updated successfully", part});

    });

    deletePart = asyncHandler(async (req: Request, res: Response) => {

        await partService.deletePart(Number(req.params.id));    
        res.status(200).json({ message: "Part deleted successfully" });
    });

}

export default new PartController();