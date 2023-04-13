import { ITypeEffectivenessService, ITypeRepository, ITypeService } from "../interfaces";

export class TypeService implements ITypeService {
    constructor(private typeEffectivenessService: ITypeEffectivenessService, private typeRepository: ITypeRepository) {}
}