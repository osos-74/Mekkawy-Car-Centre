const express = require('express');
const cors = require("cors");
const router = express.Router();
import validate from "../../common/middleware/validate"
import {createInspectionSchema, filterInspectionSchema,IdSchema} from "./validation";

import inspectionController from"./controller"

router.get("/", validate(filterInspectionSchema,"query"), inspectionController.getInspections);

router.post("/", validate(createInspectionSchema,"body"),inspectionController.create);
// router.put("/:id", validate(creatISchema,"body"),carController.update);
// router.delete("/:id",carController.delete);
// router.get('/:phone',carController.getCarByPhone)
router.get('/customer/:id',validate(IdSchema,"params"),inspectionController.getInspectionByCustomerId)
router.get('/car/:id',validate(IdSchema,"params"),inspectionController.getInspectionByCarId)



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