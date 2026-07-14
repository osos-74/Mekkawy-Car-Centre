const express = require('express');
const cors = require("cors");
const router = express.Router();
import validate from "../../common/middleware/validate"
import {createCarSchema, filterCarSchema} from "./validation";

import carController from"./controller"
router.get("/", validate(filterCarSchema,"query"), carController.getCars);

router.post("/", validate(createCarSchema,"body"),carController.create);
router.put("/:id", validate(createCarSchema,"body"),carController.update);
// router.delete("/:id",carController.delete);
// router.get("/", carController.getCars);
router.get('/:phone',carController.getCarByPhone)
// router.get('/id/:customerId',carController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;