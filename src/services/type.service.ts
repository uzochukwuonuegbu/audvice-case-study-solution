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
}