import { Op } from "sequelize";
import { ITypeEffectivenessRepository, TypeEffectiveness } from "../interfaces";

export class TypeEffectivenessRepository implements ITypeEffectivenessRepository {
    constructor(private dbClient: typeof TypeEffectiveness) {}

    public async create(typeData) {
        const typeEffectiveness = new TypeEffectiveness(typeData);
        await typeEffectiveness.save();
        return typeEffectiveness;
    }

    public async findById(id) {
        return this.dbClient.findByPk(id);
    }

    public async find(query?: any) {
        return this.dbClient.findOne(query);
    }

    public async update(id, updates) {
        await this.dbClient.update(id, updates);
        // return type;
    }

    public async delete(id) {
        await this.dbClient.destroy(id);
    }

    public async findAll(query?: any) {
        return this.dbClient.findAll(query);
    }

    public async findBySourceIds(sourceIds: string[]) {
        return this.dbClient.findAll({ where: { sourceId: { [Op.in]: sourceIds } } });
    }

    public async findByTargetIds(targetIds: string[]) {
        return this.dbClient.findAll({ where: { targetId: { [Op.in]: targetIds } } });
    }
}