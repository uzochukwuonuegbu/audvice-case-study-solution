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
      public async getTypeCounters(types: string[]) {
        const counters = new Map();
      
        // Fetch all types at once
        const typeMap = new Map();
        const typeNames = types.map(type => type.toLowerCase());
        const typeList = await this.typeRepository.findByTypeNames(typeNames);
        for (const type of typeList) {
          typeMap.set(type.name.toLowerCase(), type);
        }
      
        // Calculate effectiveness for each unique pair of types
        const effectivenessMap = new Map();
        for (let i = 0; i < types.length; i++) {
          const type1 = typeMap.get(types[i].toLowerCase());
          for (let j = i + 1; j < types.length; j++) {
            const type2 = typeMap.get(types[j].toLowerCase());
            const key = `${type1.id}:${type2.id}`;
            if (!effectivenessMap.has(key)) {
              const effectiveness = await this.typeEffectivenessService.getEffectiveness(type1.id, type2.id);
              effectivenessMap.set(key, effectiveness);

              // Also add the reverse pair to the map, to reduce the iterations
              const reverseKey = `${type2.id}:${type1.id}`;
              effectivenessMap.set(reverseKey, effectiveness);
            }
          }
        }
      
        // Calculate counters for each type
        for (let i = 0; i < types.length; i++) {
          const type1 = typeMap.get(types[i].toLowerCase());
          for (let j = 0; j < types.length; j++) {
            if (i === j) continue;
      
            const type2 = typeMap.get(types[j].toLowerCase());
            const key = `${type1.id}:${type2.id}`;
            const effectiveness = effectivenessMap.get(key);
      
            // Calculate counters for the second type
            const counterEffectiveness = effectiveness * -1;
            const counterType = type2;
            const counterTypeName = counterType.name.toLowerCase();
            counters.set(counterTypeName, (counters.get(counterTypeName) || 0) + counterEffectiveness);
      
            // Handle dual typing by calculating counters for both types
            if (type1.dual_typing) {
              const dualKey = `${type1.dual_typing.id}:${type2.id}`;
              let dualEffectiveness = effectivenessMap.get(dualKey);
              if (!dualEffectiveness) {
                dualEffectiveness = await this.typeEffectivenessService.getEffectiveness(type1.dual_typing.id, type2.id);
                effectivenessMap.set(dualKey, dualEffectiveness);
                // Also add the reverse pair to the map
                const reverseKey = `${type2.id}:${type1.dual_typing.id}`;
                effectivenessMap.set(reverseKey, dualEffectiveness);
              }
              const dualCounterEffectiveness = dualEffectiveness * -1;
              const dualCounterType = type1.dual_typing;
              const dualCounterTypeName = dualCounterType.name.toLowerCase();
              counters.set(dualCounterTypeName, (counters.get(dualCounterTypeName) || 0) + dualCounterEffectiveness);
            }
          }
        }
      
        return Object.fromEntries(counters.entries());
      }
}