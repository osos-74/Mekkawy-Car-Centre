import {
    Request,
    Response,
    NextFunction,
    RequestHandler
} from "express";

export const asyncHandler =
    (handler: RequestHandler): RequestHandler =>
    (req, res, next) =>
        Promise.resolve(handler(req, res, next))
            .catch(next);