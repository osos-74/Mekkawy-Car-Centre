const express = require('express');
const router = express.Router();
import validate from "../../common/middleware/validate"
import {createPartSchema,updatePartSchema} from "./validation";
import customerController from "./controller"

router.post("/", validate(createPartSchema), customerController.create);
router.put("/:id", validate(updatePartSchema), customerController.update);
router.delete("/:id", customerController.deletePart);
router.get("/", customerController.getParts);
router.get('/low-stock', customerController.getLowStockParts);
router.get('/:id', customerController.getPartById);

export default router;