import { Op } from "sequelize";
import { ITypeEffectivenessRepository, ITypeEffectivenessService, ITypeRepository } from "../interfaces";

export class TypeEffectivenessService implements ITypeEffectivenessService {
    constructor(private typeRepository: ITypeRepository, private typeEffectivenessRepository: ITypeEffectivenessRepository) {}

    public async createTypeEffectiveness(sourceType: string, targetType: string, effectiveness: number) {
      const [type1, type2] = await Promise.all([
        this.typeRepository.find({ where: { name: sourceType } }),
        this.typeRepository.find({ where: { name: targetType } }),
      ]);
      if (!type1 || !type2) {
        throw new Error('Invalid type names');
      }
      const typeEffectiveness = await this.typeEffectivenessRepository.create({
        effectiveness,
        sourceId: type1.id,
        targetId: type2.id,
      });
      return typeEffectiveness;
    }

  public async getTypeEffectivenessBySourceIds(sourceIds: string[]) {
    const typeEffectivenessArray = this.typeEffectivenessRepository.findBySourceIds(sourceIds);
    return typeEffectivenessArray;
  }

  public async getTypeEffectivenessBySourceIdAndTargetId(sourceId: string, targetId: string) {
    const typeEffectivenessArray = this.typeEffectivenessRepository.findByTargetIdAndSourceId(sourceId, targetId);
    return typeEffectivenessArray;
  }

  public async updateTypeEffectiveness(id: string, data: any): Promise<void> {
    await this.typeEffectivenessRepository.update(id, data);
  }
}