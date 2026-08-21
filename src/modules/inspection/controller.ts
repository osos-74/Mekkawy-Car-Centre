
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import inspectionService from "./service";
import Inspection from "./model";

class CarController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const car = await inspectionService.createInspection(req.body);

        res.status(201).json({ message: "Car created successfully", car });

    });
    
    getInspections = asyncHandler(async (req: Request, res: Response) => {

        const inspections = await inspectionService.getAllInspections(req.query);
        if (!inspections || inspections.length === 0) {
            return res.status(404).json({ message: "No inspections found" });
        }
        res.status(200).json({message : "inspections retrieved successfully", inspections});

    });

    // getCarByPhone = asyncHandler(async (req: Request, res: Response) => {

    //     const car = await carService.getCarByPhone(String(req.params.phone));    
    //     res.status(200).json({message : "Car retrieved successfully", car});
    // });

    // update = asyncHandler(async (req: Request, res: Response) => {

    //     const car = await carService.updateCar(Number(req.params.id), req.body); 

    //     res.status(200).json({message : "Car updated successfully", car});

    // });

    // delete = asyncHandler(async (req: Request, res: Response) => {

    //      await carService.delete(Number(req.params.id));    
        
    //     res.status(200).json({ message: "Car deleted successfully" });
    // });

    getInspectionByCustomerId = asyncHandler(async (req: Request, res: Response) => {

        const inspections = await inspectionService.getInspectionByCustomerId(Number(req.params.id)); 

        res.status(200).json({ inspections});

    });
     getInspectionByCarId = asyncHandler(async (req: Request, res: Response) => {

        const inspections = await inspectionService.getInspectionByCarId(Number(req.params.id)); 

        res.status(200).json({inspections});

    });
}

export default new CarController();