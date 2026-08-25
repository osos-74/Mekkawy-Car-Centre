import { Router } from "express";

import validate from "../../common/middleware/validate";
import authenticate from "../../common/middleware/authenticate";
import authorize from "../../common/middleware/authorize";
import { UserRole } from "../user/model";

import {
    createCustomerSchema,
    CustomerIdSchema,
    CustomerFilterDtoSchema
} from "./validation";

import customerController from "./controller";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    validate(createCustomerSchema),
    customerController.create
);

router.put(
    "/:id",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    validate(createCustomerSchema),
    customerController.update
);

router.delete(
    "/:id",
    authorize(UserRole.ADMIN, UserRole.SERVICE_ADVISOR),
    customerController.deleteCustomer
);

router.get(
    "/",
    validate(CustomerFilterDtoSchema, "query"),
    customerController.getCustomers
);

router.get("/:phone", customerController.getCustomerByPhone);

router.get(
    "/id/:id",
    validate(CustomerIdSchema, "params"),
    customerController.getCustomerById
);

export default router;
