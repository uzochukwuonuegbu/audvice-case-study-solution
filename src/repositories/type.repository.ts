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
    
      async update(id, updates) {
        const type = await Type.update(id, updates);
        return type;
      }
    
      async delete(id) {
        await Type.destroy(id);
      }
    
      async findAll() {
        return Type.findAll();
      }
    
      async findByTypeNames(names) {
        return Type.findAll({ where: { name: { [Op.in]: names } } });
      }
}