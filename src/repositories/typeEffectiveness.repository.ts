import { Op } from 'sequelize';
import { ITypeEffectivenessRepository, TypeEffectiveness } from '../interfaces';
import { BaseRepository } from './base.repository';

export class TypeEffectivenessRepository extends BaseRepository<TypeEffectiveness>
  implements ITypeEffectivenessRepository {
  constructor(dbClient: typeof TypeEffectiveness) {
    super(dbClient);
  }

  public async findBySourceIds(sourceIds: string[]): Promise<TypeEffectiveness[]> {
    return this.dbClient.findAll({ where: { sourceId: { [Op.in]: sourceIds } } });
  }

  public async findByTargetIds(targetIds: string[]): Promise<TypeEffectiveness[]> {
    return this.dbClient.findAll({ where: { targetId: { [Op.in]: targetIds } } });
  }

  public async findByTargetIdAndSourceId(sourceId: string, targetId: string): Promise<TypeEffectiveness | null> {
    return this.dbClient.findOne({ where: { targetId, sourceId } });
  }
}