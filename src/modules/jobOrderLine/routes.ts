// import { Router } from "express";

// import quotationLineController from "./controller";

// import validate from "../../common/middleware/validate";

// import {
//     createQuotationLineSchema,
//     updateQuotationLineSchema,
// } from "./validation";



// const router = Router();

// router.post(
//     "/",
//     validate(createQuotationLineSchema),
//     quotationLineController.create
// );

// router.get(
//     "/:id",

//     quotationLineController.getById
// );

// router.get(
//     "/quotation/:quotationId",quotationLineController.getByQuotationId
// );

// router.put(
//     "/:id",
//     validate(updateQuotationLineSchema),
//     quotationLineController.update
// );

// router.delete(
//     "/:id",

//     quotationLineController.delete
// );

// export default router;