const express = require('express');
const cors = require("cors");
const router = express.Router();
import validate from "../../common/middleware/validate"
import {createCustomerSchema,CustomerIdSchema,CustomerFilterDtoSchema} from "./validation";

import customerController from"./controller"
router.post("/", validate(createCustomerSchema),customerController.create);
router.put("/:id", validate(createCustomerSchema),customerController.update);
router.delete("/:id",customerController.deleteCustomer);
router.get( "/", validate(CustomerFilterDtoSchema, "query"),customerController.getCustomers);
router.get('/:phone',customerController.getCustomerByPhone)
router.get('/id/:id',validate(CustomerIdSchema,"params"),customerController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;