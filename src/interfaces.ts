import { NextFunction, Request, Response } from 'express-serve-static-core';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface ITypeController {
  createType(): Promise<ExpressRouteFunc>
  getType(): Promise<ExpressRouteFunc>
  getTypeById(): Promise<ExpressRouteFunc>
  updateType(): Promise<ExpressRouteFunc>
  deleteType(): Promise<ExpressRouteFunc>
}

export interface ITypeService {
}

export interface ITypeEffectivenessService {
}

export interface ITypeRepository {
}