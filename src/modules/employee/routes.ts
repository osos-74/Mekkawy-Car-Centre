import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import employeeController from "./controller";

import {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeFilterSchema,
    employeeIdSchema,
} from "./validation";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

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

export default router;
