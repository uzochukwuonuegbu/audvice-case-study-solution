import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Type } from './models/type.model';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface ITypeController {
  createType(): Promise<ExpressRouteFunc>
  getTypeCounters(): Promise<ExpressRouteFunc>
  getTypeById(): Promise<ExpressRouteFunc>
  updateType(): Promise<ExpressRouteFunc>
  deleteType(): Promise<ExpressRouteFunc>
}

export interface ITypeService {
  createType(name: string, colour: string, dualTypingName: string | undefined): Promise<Type>
  getTypeById(id: string): Promise<Type>
  getTypeCounters(names: string[]): Promise<{}>
}

export interface ITypeEffectivenessService {
}

export interface ITypeRepository {
  create(typeData: any): Promise<Type>;
  findById(id: string): Promise<Type | null>;
  update(id: string, updates: any): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Type[]>;
  findByTypeNames(names: string[]): Promise<Type[]>;
}