import { Request, Response } from "express";
import { ExpressRouteFunc, ITypeController, ITypeService } from "../interfaces";

export class TypeController implements ITypeController {
    constructor(private typeService: ITypeService) {
    }

    public async createType(): Promise<ExpressRouteFunc> {
        return async (req: Request, res: Response) => {
            try {
                const { name, color } = req.body;
                const type = await this.typeService.createType({ name, color });
                res.status(200).json(type);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        }
    }

    public async getType(): Promise<ExpressRouteFunc> {
        try {
        } catch(error) {
        }
    }

    public async getTypeById(): Promise<ExpressRouteFunc> {
        try {
        } catch(error) {
        }
    }

    public async updateType(): Promise<ExpressRouteFunc> {
        try {
        } catch(error) {
        }
    }

    public async deleteType(): Promise<ExpressRouteFunc> {
        try {
        } catch(error) {
        }
    }
}