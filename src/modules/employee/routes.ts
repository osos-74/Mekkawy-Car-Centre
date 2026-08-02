import { Router } from "express";

import validate from "../../common/middleware/validate";
import { asyncHandler } from "../../common/middleware/asyncHandler";

import employeeController from "./controller";

import {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeFilterSchema,
    employeeIdSchema,
} from "./validation";

const router = Router();

router.post("/", validate(createEmployeeSchema), employeeController.createEmployee);

router.get("/", validate(employeeFilterSchema, "query"), employeeController.getAllEmployees);

router.get("/:id", validate(employeeIdSchema, "params"), employeeController.getEmployeeById);

router.patch(
    "/:id",
    validate(employeeIdSchema, "params"),
    validate(updateEmployeeSchema),
    employeeController.updateEmployee
);

router.delete(
    "/:id",
    validate(employeeIdSchema, "params"),
    employeeController.deleteEmployee
);
export default router