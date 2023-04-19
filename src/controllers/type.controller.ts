import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ExpressRouteFunc, ITypeController, ITypeService } from "../interfaces";
import { InvalidRequestInputError, NotFoundError, RecordExistsError } from "./errorHandler/httpError";
import { createTypeSchema } from "./validators/type.validator";

export class TypeController implements ITypeController {
    constructor(private typeService: ITypeService) {
    }

    public createType(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    throw new InvalidRequestInputError(errorMessage);
                }

                const { name, color } = value;
                const typeExists = await this.typeService.getTypeByName(name);
                if (typeExists) {
                    throw new RecordExistsError();
                }

                const type = await this.typeService.createType(name, color);
                res.status(201).json({ status: 201, message: 'success', data: type });
            } catch (err) {
                next(err);
            }
        }
    }

    public getTypeCounters(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const counters = await this.typeService.getTypeCounters([req.params.name]);
                res.status(200).json({ status: 200, message: 'success', data: counters });
            } catch (err) {
                next(err)
            }
        }
    }

    public getTypeById(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const type = await this.typeService.getTypeById(req.params.id);
                if (type) {
                  res.status(200).json({ status: 200, message: 'success', data: type });
                } else {
                  throw new NotFoundError();
                }
              } catch (err) {
                next(err);
              }
        }
    }

    public updateType(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    throw new InvalidRequestInputError(errorMessage);
                }
                await this.typeService.updateType(req.params.id, value);
                res.status(200).json({ status: 200, message: 'success', data: { id: req.params.id } });
              } catch (err) {
                next(err);
              }
        }
    }

    public deleteType(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.typeService.deleteType(req.params.id);
                res.status(200).json({ status: 200, message: 'Type deleted' });
              } catch (err) {
                next(err);
              }
        }
    }
}