import { Op } from "sequelize";
import { ITypeEffectivenessRepository, TypeEffectiveness } from "../interfaces";

export class TypeEffectivenessRepository implements ITypeEffectivenessRepository {
    constructor(private dbClient: typeof TypeEffectiveness) {}

    public async create(typeData) {
        return this.dbClient.create(typeData);
    }

    public async findBySourceIds(sourceIds: string[]) {
        return this.dbClient.findAll({ where: { sourceId: { [Op.in]: sourceIds } } });
    }

    public async findByTargetIds(targetIds: string[]) {
        return this.dbClient.findAll({ where: { targetId: { [Op.in]: targetIds } } });
    }
}