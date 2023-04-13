import { NextFunction, Request, Response } from 'express-serve-static-core';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;