import { Op } from 'sequelize';
import { ITypeRepository, Type } from '../interfaces';
import { BaseRepository } from './base.repository';

export class TypeRepository extends BaseRepository<Type> implements ITypeRepository {
    constructor(dbClient: typeof Type) {
      super(dbClient);
    }

    public async findByTypeName(name: string): Promise<Type | null> {
      return this.dbClient.findOne({ where: { name } });
    }
  
    public async findByTypeNames(names: string[]): Promise<Type[]> {
      return this.dbClient.findAll({ where: { name: { [Op.in]: names } } });
    }
  }