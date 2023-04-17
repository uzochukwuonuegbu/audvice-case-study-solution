import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'sequelize';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface ITypeController {
  createType(): ExpressRouteFunc
  getTypeCounters(): ExpressRouteFunc
  getTypeById(): ExpressRouteFunc
  updateType(): ExpressRouteFunc
  deleteType(): ExpressRouteFunc
}

export interface ITypeService {
  createType(name: string, colour: string): Promise<Type>
  getTypeById(id: string): Promise<Type>
  getTypeCounters(names: string[]): Promise<Type[]>
  getTypeByName(name: string): Promise<Type | null>
  updateType(id: string, data: any): Promise<void>
  deleteType(id: string): Promise< void>
}

export interface ITypeEffectivenessService {
  getTypeEffectivenessBySourceIds(sourceIds: string[]): Promise<TypeEffectiveness[]>
}

// TODO: make DRY
export interface ITypeEffectivenessRepository {
  create(typeData: any): Promise<TypeEffectiveness>;
  findBySourceIds(sourceIds: string[]): Promise<TypeEffectiveness[]>;
  findByTargetIds(targetIds: string[]): Promise<TypeEffectiveness[]>;
}
export interface ITypeRepository {
  create(typeData: any): Promise<Type>;
  findById(id: string): Promise<Type | null>;
  find(query?: any): Promise<Type | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Type[]>;
  findByTypeNames(names: string[]): Promise<Type[]>;
  findByTypeName(name: string): Promise<Type>;
}


// Models
interface TypeAttributes {
  id?: string;
  name: string;
  color: string;
}

interface TypeEffectivenessAttributes {
  id?: string;
  sourceId: string;
  targetId: string;
  effectiveness: number;
}

export class Type extends Model<TypeAttributes> implements TypeAttributes {
  public id!: string;
  public name!: string;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class TypeEffectiveness extends Model<TypeEffectivenessAttributes> implements TypeEffectivenessAttributes {
    public id!: string;
    public sourceId!: string;
    public targetId!: string;
    public effectiveness!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}