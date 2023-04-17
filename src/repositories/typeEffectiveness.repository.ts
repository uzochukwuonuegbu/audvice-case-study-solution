import { Op } from "sequelize";
import { ITypeEffectivenessRepository, TypeEffectiveness } from "../interfaces";

export class TypeEffectivenessRepository implements ITypeEffectivenessRepository {
    constructor(private dbClient: typeof TypeEffectiveness) {}

    public async create(typeData) {
        return this.dbClient.create(typeData);
    }

    public async update(id: string, updates) {
        const query = {
            where: {
                id
            }
        }
        await this.dbClient.update(updates, query);
        return id;
    }

    public async findBySourceIds(sourceIds: string[]) {
        return this.dbClient.findAll({ where: { sourceId: { [Op.in]: sourceIds } } });
    }

    public async findByTargetIds(targetIds: string[]) {
        return this.dbClient.findAll({ where: { targetId: { [Op.in]: targetIds } } });
    }

    public async findByTargetIdAndSourceId(sourceId: string, targetId: string) {
        return this.dbClient.findOne({ where: { targetId, sourceId } });
    }
}