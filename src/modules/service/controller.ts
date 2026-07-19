
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import serviceService from "./service";

class ServiceController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const service = await serviceService.createService(req.body);

        res.status(201).json(service);

    });

    getServices = asyncHandler(async (req: Request, res: Response) => {

        const services = await serviceService.getAllServices();
        res.status(200).json({message : "Services retrieved successfully", services});

    });


    getServiceById = asyncHandler(async (req: Request, res: Response) => {

        const service = await serviceService.getServiceById(Number(req.params.id));
        res.status(200).json({message : "Service retrieved successfully", service});
    });


    update = asyncHandler(async (req: Request, res: Response) => {

        const service = await serviceService.updateService(Number(req.params.id), req.body); 

        res.status(200).json({message : "Service updated successfully", service});

    });

    deleteService = asyncHandler(async (req: Request, res: Response) => {

        await serviceService.deleteService(Number(req.params.id));    
        res.status(200).json({ message: "Service deleted successfully" });
    });

}

export default new ServiceController();