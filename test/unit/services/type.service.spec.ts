import { ITypeEffectivenessService, ITypeRepository, Type } from '../../../src/interfaces';
import { TypeService } from '../../../src/services/type.service';

describe('TypeService', () => {
  let typeEffectivenessService: ITypeEffectivenessService;
  let typeRepository: ITypeRepository;
  let typeService: TypeService;

  beforeEach(() => {
    typeEffectivenessService = {
      getTypeEffectivenessBySourceIds: jest.fn(),
    } as unknown as ITypeEffectivenessService;

    typeRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByTypeName: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as ITypeRepository;

    typeService = new TypeService(typeEffectivenessService, typeRepository);
  });

  describe('createType', () => {
    it('should create a new type and return it', async () => {
      const name = 'Fire';
      const color = 'red';
      const expectedType = { id: '1', name, color } as Type;

      (typeRepository.create as jest.Mock).mockResolvedValueOnce(expectedType);

      const result = await typeService.createType(name, color);

      expect(typeRepository.create).toHaveBeenCalledWith({ name, color });
      expect(result).toEqual(expectedType);
    });
  });

  describe('getTypeById', () => {
    it('should return a type with the given ID', async () => {
      const id = '1';
      const expectedType = { id, name: 'Fire', color: 'red' } as Type;

      (typeRepository.findById as jest.Mock).mockResolvedValueOnce(expectedType);

      const result = await typeService.getTypeById(id);

      expect(typeRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedType);
    });
  });

  describe('getTypeByName', () => {
    it('should return a type with the given name', async () => {
      const name = 'Fire';
      const expectedType = { id: '1', name, color: 'red' } as Type;

      (typeRepository.findByTypeName as jest.Mock).mockResolvedValueOnce(expectedType);

      const result = await typeService.getTypeByName(name);

      expect(typeRepository.findByTypeName).toHaveBeenCalledWith(name);
      expect(result).toEqual(expectedType);
    });
  });
});