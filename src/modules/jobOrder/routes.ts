// const express = require('express');
// const cors = require("cors");
// const router = express.Router();
// import validate from "../../common/middleware/validate"
// import {createQuotationSchema,updateQuotationSchema,filterQuotationSchema} from "./validation";

// import quotationController from"./controller"
// import { createQuotationLineSchema } from "../quotationLine/validation";
// router.post("/", validate(createQuotationSchema),quotationController.create);
// router.get("/", validate(filterQuotationSchema,"query"), quotationController.getQuotations);
// router.put("/:id", validate(updateQuotationSchema),quotationController.update);
// router.delete("/:id",quotationController.deleteQuotation);
// router.post(
//     "/add-line",
//     validate(createQuotationLineSchema),
//     quotationController.addLine
// );
// router.delete("/delete-line/:id",quotationController.deleteLine);
// // router.get("/", quotationController.getQuotations);
// // router.get('/:id',quotationController.getQuotationById)
// // router.get('/id/:customerId',customerController.getCustomerById)


// // router.post("/", customerController.addCustomer);

// export default router;