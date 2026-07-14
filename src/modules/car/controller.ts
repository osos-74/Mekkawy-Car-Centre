
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import carService from "./service";

class CarController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const car = await carService.createCar(req.body);

        res.status(201).json({ message: "Car created successfully", car });

    });
    
    getCars = asyncHandler(async (req: Request, res: Response) => {

        const cars = await carService.getAllCars(req.query);
        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: "No cars found" });
        }
        res.status(200).json({message : "Cars retrieved successfully", cars});

    });

    getCarByPhone = asyncHandler(async (req: Request, res: Response) => {

        const car = await carService.getCarByPhone(String(req.params.phone));    
        res.status(200).json({message : "Car retrieved successfully", car});
    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const car = await carService.updateCar(Number(req.params.id), req.body); 

        res.status(200).json({message : "Car updated successfully", car});

    });

//     deleteCustomer = asyncHandler(async (req: Request, res: Response) => {

//         await customerService.deleteCustomer(Number(req.params.id));    
//         res.status(200).json({ message: "Customer deleted successfully" });
//     });

}

export default new CarController();