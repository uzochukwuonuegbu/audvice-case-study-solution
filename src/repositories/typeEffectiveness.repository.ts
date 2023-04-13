import { ITypeEffectivenessRepository } from "../interfaces";
import { TypeEffectiveness } from "../models/typeEffectiveness.model";

export class TypeEffectivenessRepository implements ITypeEffectivenessRepository {
    async create(typeData) {
        const typeEffectiveness = new TypeEffectiveness(typeData);
        await typeEffectiveness.save();
        return typeEffectiveness;
      }
    
      async findById(id) {
        return TypeEffectiveness.findByPk(id);
      }

      async find(query?: any) {
        return TypeEffectiveness.findByPk(query);
      }
    
      async update(id, updates) {
        await TypeEffectiveness.update(id, updates);
        // return type;
      }
    
      async delete(id) {
        await TypeEffectiveness.destroy(id);
      }
    
      async findAll(query?: any) {
        return TypeEffectiveness.findAll(query);
      }
}