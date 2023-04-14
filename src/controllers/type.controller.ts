import { Request, Response } from "express";
import { ExpressRouteFunc, ITypeController, ITypeService } from "../interfaces";
import { createTypeSchema } from "./validators/type.validator";

export class TypeController implements ITypeController {
    constructor(private typeService: ITypeService) {
    }

    public createType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const { name, color } = value;
                const type = await this.typeService.createType(name, color);
                res.status(201).json(type);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        }
    }

    public getTypeCounters(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const counters = await this.typeService.getTypeCounters(req.params.name);
                res.status(200).json(counters);
            } catch (err) {
                res.status(400).json({ error: err.message });
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
                  res.status(404).json({ error: 'Type not found' });
                }
              } catch (err) {
                res.status(400).json({ error: err.message });
              }
        }
    }

    public updateType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                const { error, value } = createTypeSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                await this.typeService.updateType(req.params.id, value);
                res.status(200).json({ message: 'Updated Successfully' });
              } catch (err) {
                res.status(400).json({ error: err.message });
              }
        }
    }

    public deleteType(): ExpressRouteFunc {
        return async (req: Request, res: Response) => {
            try {
                await this.typeService.deleteType(req.params.id);
                res.status(200).json({ message: 'Type deleted' });
              } catch (err) {
                res.status(400).json({ error: err.message });
              }
        }
    }
}