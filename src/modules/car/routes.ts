const express = require('express');
const cors = require("cors");
const router = express.Router();
import {validate} from "../../common/middleware/validate"
import {createCarSchema} from "./validation";

import carController from"./controller"
router.post("/", validate(createCarSchema),carController.create);
router.put("/:id", validate(createCarSchema),carController.update);
// router.delete("/:id",carController.delete);
// router.get("/", carController.getCars);
router.get('/:phone',carController.getCarByPhone)
// router.get('/id/:customerId',carController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;