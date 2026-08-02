import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";

import employeeService from "./service";

class EmployeeController {

    createEmployee = asyncHandler(async (req: Request, res: Response) => {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    });

    getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
        const employee = await employeeService.getEmployeeById(Number(req.params.id));
        res.status(200).json(employee);
    });

    getAllEmployees = asyncHandler(async (req: Request, res: Response) => {
        const employees = await employeeService.getAllEmployees(req.query);
        res.status(200).json(employees);
    });

    updateEmployee = asyncHandler(async (req: Request, res: Response) => {
        const employee = await employeeService.updateEmployee(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(employee);
    });

    deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
        await employeeService.deleteEmployee(Number(req.params.id));
        res.sendStatus(204);
    });
}

export default new EmployeeController();