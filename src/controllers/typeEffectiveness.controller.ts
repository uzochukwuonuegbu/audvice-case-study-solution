import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ExpressRouteFunc, ITypeEffectivenessController, ITypeEffectivenessService } from "../interfaces";
import { InvalidRequestInputError } from "./errorHandler/httpError";
import { createTypeEffectivenessSchema } from "./validators/typeEffectiveness.validator";

export class TypeEffectivenessController implements ITypeEffectivenessController {
    constructor(private typeEffectivenessService: ITypeEffectivenessService) {
    }

    public createTypeOrUpdateEffectiveness(): ExpressRouteFunc {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = createTypeEffectivenessSchema.validate(req.body);
                if (error) {
                    const errorMessage = error.details[0].message;
                    throw new InvalidRequestInputError(errorMessage);
                }

                const { sourceId, targetId, effectiveness } = value;
                const typeEffectivenessExists = await this.typeEffectivenessService.getTypeEffectivenessBySourceIdAndTargetId(sourceId, targetId);
                if (typeEffectivenessExists) {
                    return this.typeEffectivenessService.updateTypeEffectiveness(typeEffectivenessExists.id, typeEffectivenessExists);
                }

                const data = await this.typeEffectivenessService.createTypeEffectiveness(sourceId, targetId, effectiveness);
                res.status(201).json({ status: 201, message: 'success', data });
            } catch (err) {
                next(err);
            }
        }
    }
}