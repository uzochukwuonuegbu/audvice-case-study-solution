import { Op } from 'sequelize';
import { ITypeRepository, Type } from '../interfaces';

export class TypeRepository implements ITypeRepository {
    constructor(private dbClient: typeof Type) {
    }

    public async create(typeData) {
        return this.dbClient.create(typeData);
    }

    public async findById(id) {
        return this.dbClient.findByPk(id);
    }

    public async find(query?: any) {
        return this.dbClient.findOne(query);
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

    public async delete(id) {
        const query = {
            where: {
                id
            }
        }
        await this.dbClient.destroy(query);
    }

    public async findAll(query?: any) {
        return this.dbClient.findAll(query);
    }

    public async findByTypeName(name: string) {
        return this.dbClient.findOne({ where: { name } });
    }

    public async findByTypeNames(names) {
        return this.dbClient.findAll({ where: { name: { [Op.in]: names } } });
    }
}