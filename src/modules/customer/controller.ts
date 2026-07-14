
import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import customerService from "./service";

class CustomerController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const customer = await customerService.createCustomer(req.body);

        res.status(201).json(customer);

    });
    
    getCustomers = asyncHandler(async (req: Request, res: Response) => {

        const customers = await customerService.getAllCustomers();
        res.status(200).json({message : "Customers retrieved successfully", customers});

    });

    getCustomerByPhone = asyncHandler(async (req: Request, res: Response) => {

        const customer = await customerService.getCustomerByPhone(String(req.params.phone));    
        res.status(200).json({message : "Customer retrieved successfully", customer});
    });
    update = asyncHandler(async (req: Request, res: Response) => {

        const customer = await customerService.updateCustomer(Number(req.params.id), req.body); 

        res.status(200).json({message : "Customer updated successfully", customer});

    });

    deleteCustomer = asyncHandler(async (req: Request, res: Response) => {

        await customerService.deleteCustomer(Number(req.params.id));    
        res.status(200).json({ message: "Customer deleted successfully" });
    });

}

export default new CustomerController();