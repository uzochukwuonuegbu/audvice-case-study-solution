import { Op } from "sequelize";
import { ITypeEffectivenessService, ITypeRepository, ITypeService } from "../interfaces";
import { Type } from "../models/type.model";

export class TypeService implements ITypeService {
    constructor(private typeEffectivenessService: ITypeEffectivenessService, private typeRepository: ITypeRepository) {}

    public async createType(name: string, color: string, dualTypingName: string | undefined): Promise<Type> {
        let dualTyping = null;
        if (dualTypingName) {
          dualTyping = await this.typeRepository.findByTypeNames([dualTypingName]);
          if (!dualTyping) {
            throw new Error(`Type ${dualTypingName} not found`);
          }
        }
      
        const type = await this.typeRepository.create({
          name: name,
          color: color,
          dual_typing_id: dualTyping ? dualTyping.id : null,
        });
      
        if (dualTyping) {
            const dualType = await this.typeRepository.findById(type.dual_typing_id);
            type.dual_typing = dualType;
            return type;
        }
      
        return type;
      }

      public async getTypeById(id: string): Promise<Type> {
        return this.typeRepository.findById(id);
      }

    //   TODO: split to smaller private functions
    public async getTypeCounters(typeName: string): Promise<Type[]> {
        // Get the Type record for the given type name
        const type = await this.typeRepository.find({ where: { name: typeName } });
        if (!type) {
            throw new Error(`Type ${typeName} not found`);
        }
    
        // Find all Type records where effectiveness is 2 for the given type
        const typeEffectivenesses = await this.typeEffectivenessService.getTypeEffectivenessBySourceId(type.id);
    
        // Get the Type records for each matching TypeEffectiveness
        const typeIds = typeEffectivenesses.map((te) => te.targetId);
        const typeCounters = await this.typeRepository.findAll({ where: { id: { [Op.in]: typeIds } } });
    
        return typeCounters;
    }
}