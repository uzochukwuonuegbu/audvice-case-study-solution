import { DataTypes, Op } from 'sequelize';
import { ITypeRepository, Type } from '../interfaces';
import sequelize from '../infrastructure/sequelize.orm';

export class TypeRepository implements ITypeRepository {
    constructor(private dbClient: typeof Type) {
    }

    public async create(typeData) {
        // console.log({ query: })
        return this.dbClient.create(typeData);
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

    public async findByTypeNames(names) {
        return this.dbClient.findAll({ where: { name: { [Op.in]: names } } });
    }
}