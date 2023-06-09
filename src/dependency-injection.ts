import { TypeController } from './controllers/type.controller';
import { TypeEffectivenessController } from './controllers/typeEffectiveness.controller';
import { ITypeController, ITypeEffectivenessController, ITypeEffectivenessRepository, ITypeEffectivenessService, ITypeRepository, ITypeService } from './interfaces';
import { Type, TypeEffectiveness } from './models';
import { TypeRepository } from './repositories/type.repository';
import { TypeEffectivenessRepository } from './repositories/typeEffectiveness.repository';
import { TypeService } from './services/type.service';
import { TypeEffectivenessService } from './services/typeEffectiveness.service';


export function getTypeController(): ITypeController {
    return new TypeController(getTypeService());
}

export function getTypeEffectivenessController(): ITypeEffectivenessController {
    return new TypeEffectivenessController(getTypeEffectivenessService());
}

export function getTypeService(): ITypeService {
    return new TypeService(getTypeEffectivenessService(), getTypeRepository());
}

export function getTypeEffectivenessService(): ITypeEffectivenessService {
    return new TypeEffectivenessService(getTypeRepository(), getTypeEffectivenessRepository());
}

export function getTypeRepository(): ITypeRepository {
    return new TypeRepository(Type);
}

export function getTypeEffectivenessRepository(): ITypeEffectivenessRepository {
    return new TypeEffectivenessRepository(TypeEffectiveness);
}
