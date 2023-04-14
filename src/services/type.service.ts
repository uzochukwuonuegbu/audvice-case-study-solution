import { Op } from "sequelize";
import { ITypeEffectivenessService, ITypeRepository, ITypeService } from "../interfaces";
import { Type } from "../models/type.model";

export class TypeService implements ITypeService {
    constructor(private typeEffectivenessService: ITypeEffectivenessService, private typeRepository: ITypeRepository) {}

    public async createType(name: string, color: string): Promise<Type> {
      const type = await this.typeRepository.create({
        name,
        color,
      });

      return type;
    }

    public async getTypeById(id: string): Promise<Type> {
      return this.typeRepository.findById(id);
    }

    //   TODO: split to smaller private functions
    public async getTypeCounters(typeNames: string[]): Promise<Type[]> {
      // Get the Type records for the given type names
      const types = await this.typeRepository.findAll({ where: { name: { [Op.in]: typeNames } } });
      if (types.length !== typeNames.length) {
        throw new Error(`One or more types not found: ${typeNames.filter((name) => !types.some((type) => type.name === name)).join(', ')}`);
      }

      // Find all Type records where effectiveness is 2 for any of the given types
      const typeIds = types.map((type) => type.id);
      const typeEffectivenesses = await this.typeEffectivenessService.getTypeEffectivenessBySourceIds(typeIds);

      // Get the Type records for each matching TypeEffectiveness
      const targetTypeIds = typeEffectivenesses.map((te) => te.targetId);
      const typeCounters = await this.typeRepository.findAll({ where: { id: { [Op.in]: targetTypeIds } } });

      return typeCounters;

    }

    public async updateType(id: string, data: any): Promise<void> {
        await this.typeRepository.update(id, data);
    }

    public async deleteType(id: string): Promise<void> {
      await this.typeRepository.delete(id);
  }
}