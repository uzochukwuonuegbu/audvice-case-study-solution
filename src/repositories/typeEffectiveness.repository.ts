import { Op } from "sequelize";
import { ITypeEffectivenessRepository } from "../interfaces";
import { TypeEffectiveness } from "../models/typeEffectiveness.model";

export class TypeEffectivenessRepository implements ITypeEffectivenessRepository {
    public async create(typeData) {
        const typeEffectiveness = new TypeEffectiveness(typeData);
        await typeEffectiveness.save();
        return typeEffectiveness;
    }

    public async findById(id) {
        return TypeEffectiveness.findByPk(id);
    }

    public async find(query?: any) {
        return TypeEffectiveness.findOne(query);
    }

    public async update(id, updates) {
        await TypeEffectiveness.update(id, updates);
        // return type;
    }

    public async delete(id) {
        await TypeEffectiveness.destroy(id);
    }

    public async findAll(query?: any) {
        return TypeEffectiveness.findAll(query);
    }

    public async findBySourceIds(sourceIds: string[]) {
        return TypeEffectiveness.findAll({ where: { sourceId: { [Op.in]: sourceIds } } });
    }

    public async findByTargetIds(targetIds: string[]) {
        return TypeEffectiveness.findAll({ where: { targetId: { [Op.in]: targetIds } } });
    }
}