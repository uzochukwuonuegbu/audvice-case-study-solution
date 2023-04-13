import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Type } from './models/type.model';
import { TypeEffectiveness } from './models/typeEffectiveness.model';

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
  getTypeCounters(name: string): Promise<Type[]>
  updateType(id: string, data: any): Promise<void>
  deleteType(id: string): Promise< void>
}

export interface ITypeEffectivenessService {
  getTypeEffectivenessBySourceId(sourceId: string): Promise<TypeEffectiveness[]>
}

// TODO: make DRY
export interface ITypeEffectivenessRepository {
  create(typeData: any): Promise<TypeEffectiveness>;
  findById(id: string): Promise<TypeEffectiveness | null>;
  find(query?: any): Promise<TypeEffectiveness | null>;
  update(id: string, updates: any): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<TypeEffectiveness[]>;
}
export interface ITypeRepository {
  create(typeData: any): Promise<Type>;
  findById(id: string): Promise<Type | null>;
  find(query?: any): Promise<Type | null>;
  update(id: string, updates: any): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Type[]>;
  findByTypeNames(names: string[]): Promise<Type[]>;
}