import { Request, Response } from "express";
import { ExpressRouteFunc, ITypeController, ITypeService } from "../interfaces";
import { BadRequestError, InvalidRequestInputError, NotFoundError } from "./errorHandler/httpError";
import { createTypeSchema } from "./validators/type.validator";

export class TypeController implements ITypeController {
    constructor(private typeService: ITypeService) {
    }

    public createType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    throw new InvalidRequestInputError(errorMessage);
                }
                const { name, color } = value;
                const type = await this.typeService.createType(name, color);
                res.status(201).json({ status: 201, message: 'success', data: type });
            } catch (err) {
                throw new BadRequestError(err);
            }
        }
    }

    public getTypeCounters(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const counters = await this.typeService.getTypeCounters(req.params.name);
                res.status(200).json(counters);
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    }

    public getTypeById(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const type = await this.typeService.getTypeById(req.params.id);
                if (type) {
                  res.status(200).json(type);
                } else {
                  throw new NotFoundError();
                }
              } catch (err) {
                throw new BadRequestError(err.message);
              }
        }
    }

    public updateType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    throw new InvalidRequestInputError(errorMessage);
                }
                await this.typeService.updateType(req.params.id, value);
                res.status(200).json({ message: 'Updated Successfully' });
              } catch (err) {
                throw new BadRequestError(err.message);
              }
        }
    }

    public deleteType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                await this.typeService.deleteType(req.params.id);
                res.status(200).json({ message: 'Type deleted' });
              } catch (err) {
                throw new BadRequestError(err.message);
              }
        }
    }
}