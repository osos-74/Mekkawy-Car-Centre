const express = require('express');
const cors = require("cors");
const router = express.Router();
import {validate} from "../../common/middleware/validate"
import {createPartSchema,updatePartSchema} from "./validation";

import customerController from"./controller"
router.post("/", validate(createPartSchema),customerController.create);
router.put("/:id", validate(updatePartSchema),customerController.update);
router.delete("/:id",customerController.deletePart);
router.get("/", customerController.getParts);
router.get('/:id',customerController.getPartById)
// router.get('/id/:customerId',customerController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;