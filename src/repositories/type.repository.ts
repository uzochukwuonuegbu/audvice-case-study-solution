import { Op } from "sequelize";
import { ITypeRepository } from "../interfaces";
import { Type } from "../models/type.model";

export class TypeRepository implements ITypeRepository {
    async create(typeData) {
        const type = new Type(typeData);
        await type.save();
        return type;
      }
    
      async findById(id) {
        return Type.findByPk(id);
      }

      async find(query?: any) {
        return Type.findByPk(query);
      }
    
      async update(id, updates) {
        await Type.update(id, updates);
        // return type;
      }
    
      async delete(id) {
        await Type.destroy(id);
      }
    
      async findAll(query?: any) {
        return Type.findAll(query);
      }
    
      async findByTypeNames(names) {
        return Type.findAll({ where: { name: { [Op.in]: names } } });
      }
}