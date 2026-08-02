
import { Router, Request, Response } from "express";

import {asyncHandler} from "../middleware/asyncHandler";
import validate from "../middleware/validate";

import companyService from "./service";

import { updateCompanySchema } from "./validation";

const router = Router();

router.get(
    "/",
    asyncHandler(async (_req: Request, res: Response) => {

        const company = await companyService.getCompany();

        res.json(company);

    })
);

router.patch(
    "/",
    validate(updateCompanySchema),
    asyncHandler(async (req: Request, res: Response) => {

        const company = await companyService.updateCompany(req.body);

        res.json(company);

    })
);

export default router;