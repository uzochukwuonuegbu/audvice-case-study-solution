import { Request, Response } from "express";
import { ExpressRouteFunc, ITypeController, ITypeService } from "../interfaces";

export class TypeController implements ITypeController {
    constructor(private typeService: ITypeService) {
    }

    public async createType(): Promise<ExpressRouteFunc> {
        return async (req: Request, res: Response) => {
            try {
                // TODO: validate input
                const { name, color, dualType = undefined } = req.body;
                const type = await this.typeService.createType(name, color, dualType);
                res.status(201).json(type);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        }
    }

    public async getTypeCounters(): Promise<ExpressRouteFunc> {
        return async (req: Request, res: Response) => {
            try {
                const counters = await this.typeService.getTypeCounters(req.params.name);
                res.status(200).json(counters);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        }
    }

    public async getTypeById(): Promise<ExpressRouteFunc> {
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

    public async updateType(): Promise<ExpressRouteFunc> {
        return async (req: Request, res: Response) => {
            try {
                // TODO: validate input
                await this.typeService.updateType(req.params.id, req.body);
                res.status(200).json({ message: 'Updated Successfully' });
              } catch (err) {
                res.status(400).json({ error: err.message });
              }
        }
    }

    public async deleteType(): Promise<ExpressRouteFunc> {
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