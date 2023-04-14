import { Op } from "sequelize";
import { ITypeRepository } from "../interfaces";
import { Type } from "../models/type.model";

export class TypeRepository implements ITypeRepository {
    public async create(typeData) {
        const type = new Type(typeData);
        await type.save();
        return type;
    }

    public async findById(id) {
        return Type.findByPk(id);
    }

    public async find(query?: any) {
        return Type.findOne(query);
    }

    public async update(id, updates) {
        await Type.update(id, updates);
        // return type;
    }

    public async delete(id) {
        await Type.destroy(id);
    }

    public async findAll(query?: any) {
        return Type.findAll(query);
    }

    public async findByTypeNames(names) {
        return Type.findAll({ where: { name: { [Op.in]: names } } });
    }
}