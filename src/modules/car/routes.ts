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
// router.get('/:phone',carController.getCarByPhone)
// router.get('/id/:customerId',carController.getCustomerById)


// router.post("/", customerController.addCustomer);

export default router;


// POST   /quotations

// GET    /quotations

// GET    /quotations/:quotationId

// PUT    /quotations/:quotationId

// DELETE /quotations/:quotationId

// POST   /quotations/:quotationId/approve

// POST   /quotations/:quotationId/reject

// GET    /quotations/:quotationId/pdf

// POST   /quotations/:quotationId/duplicate


// POST   /quotations/:quotationId/services

// POST   /quotations/:quotationId/parts

// GET    /quotations/:quotationId/lines

// PUT    /quotation-lines/:quotationLineId

// DELETE /quotation-lines/:quotationLineId