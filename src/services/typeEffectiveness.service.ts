import { Op } from "sequelize";
import { ITypeEffectivenessRepository, ITypeEffectivenessService, ITypeRepository } from "../interfaces";

export class TypeEffectivenessService implements ITypeEffectivenessService {
    constructor(private typeRepository: ITypeRepository, private typeEffectivenessRepository: ITypeEffectivenessRepository) {}

    public async createTypeEffectiveness(sourceType: string, targetType: string, effectiveness: number) {
      try {
        const [type1, type2] = await Promise.all([
          this.typeRepository.find({ where: { name: sourceType } }),
          this.typeRepository.find({ where: { name: targetType } }),
        ]);
        if (!type1 || !type2) throw new Error('Invalid type names');
        const typeEffectiveness = await this.typeEffectivenessRepository.create({
          sourceId: type1.id,
          targetId: type2.id,
          effectiveness,
        });
        return typeEffectiveness;
      } catch (err) {
        throw new Error('Failed to create TypeEffectiveness');
      }
    }

    public async getTypeEffectivenessBySourceIds(sourceIds: string[]) {
      try {
          const typeEffectivenessArray = this.typeEffectivenessRepository.findBySourceIds(sourceIds);
          return typeEffectivenessArray;
    } catch (err) {
      throw new Error('Failed to get TypeEffectiveness');
    }
  }
  }