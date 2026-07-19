const express = require('express');
const cors = require("cors");
const router = express.Router();
import validate from "../../common/middleware/validate"
import {createServiceSchema,updateServiceSchema} from "./validation";

import serviceController from"./controller"
router.post("/", validate(createServiceSchema),serviceController.create);
router.put("/:id", validate(updateServiceSchema),serviceController.update);
router.delete("/:id",serviceController.deleteService);
router.get("/", serviceController.getServices);
router.get('/:id',serviceController.getServiceById)
// router.get('/id/:customerId',customerController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;