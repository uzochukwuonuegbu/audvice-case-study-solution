import { TypeController } from './controllers/type.controller';
import { ITypeController, ITypeEffectivenessService, ITypeRepository, ITypeService } from './interfaces';
import { TypeService } from './services/type.service';
import { TypeEffectivenessService } from './services/typeEffectiveness.service';
import { TypeRepository } from './repositories/type.repository';


export function getTypeController(): ITypeController {
    return new TypeController(getTypeService());
}

export function getTypeService(): ITypeService {
    return new TypeService(getTypeEffectivenessService(), getTypeRepository());
}

export function getTypeEffectivenessService(): ITypeEffectivenessService {
    return new TypeEffectivenessService(getTypeRepository());
}

export function getTypeRepository(): ITypeRepository {
    return new TypeRepository();
}