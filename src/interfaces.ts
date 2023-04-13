import { NextFunction, Request, Response } from 'express-serve-static-core';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface ITypeController {
  createType(): Promise<void>
  getType(): Promise<void>
  getTypeById(): Promise<void>
  updateType(): Promise<void>
  deleteType(): Promise<void>
}

export interface ITypeService {
}

export interface ITypeEffectivenessService {
}

export interface ITypeRepository {
}