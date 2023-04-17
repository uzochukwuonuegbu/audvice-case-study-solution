import { Request, Response } from 'express';
import { ITypeController } from '../../../src/interfaces';
import { TypeController } from '../../../src/controllers/type.controller';
import { InvalidRequestInputError, NotFoundError, RecordExistsError } from '../../../src/controllers/errorHandler/httpError';

const mockTypeService: any = {
  getTypeByName: jest.fn(),
  createType: jest.fn(),
  getTypeCounters: jest.fn(),
  getTypeById: jest.fn()
};

const mockRequest = {
  body: {
    name: 'Test Type',
    color: 'red'
  }
} as Request;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

const mockNext = jest.fn();

describe('TypeController', () => {
  let typeController: ITypeController;

  beforeEach(() => {
    typeController = new TypeController(mockTypeService);
    jest.clearAllMocks();
  });

    describe('createType', () => {
        beforeEach(() => {
            typeController = new TypeController(mockTypeService);
            jest.clearAllMocks();
          });

          it('should throw a RecordExistsError if a type with the same name already exists', async () => {
            mockTypeService.getTypeByName.mockResolvedValue({ id: '1', name: 'Test Type', color: 'red' });

            await typeController.createType()(mockRequest, mockResponse, mockNext);

            expect(mockTypeService.getTypeByName).toHaveBeenCalledWith('Test Type');
            expect(mockTypeService.createType).not.toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(new RecordExistsError());
        });

        it('should call the next function with the caught error', async () => {
            const error = new Error('Test error');
            mockTypeService.getTypeByName.mockRejectedValue(error);

            await typeController.createType()(mockRequest, mockResponse, mockNext);

            expect(mockTypeService.getTypeByName).toHaveBeenCalledWith('Test Type');
            expect(mockTypeService.createType).not.toHaveBeenCalled();
        })

        it('should return 201 status code and the created type', async () => {
            mockTypeService.getTypeByName.mockResolvedValue(null);
            mockTypeService.createType.mockResolvedValue({ id: '1', name: 'Test Type', color: 'red' });

            await typeController.createType()(mockRequest, mockResponse, mockNext);

            expect(mockTypeService.getTypeByName).toHaveBeenCalledWith('Test Type');
            expect(mockTypeService.createType).toHaveBeenCalledWith('Test Type', 'red');
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ status: 201, message: 'success', data: { id: '1', name: 'Test Type', color: 'red' } });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should throw an InvalidRequestInputError if the request body is invalid', async () => {
            mockRequest.body = { color: 'red' };

            await typeController.createType()(mockRequest, mockResponse, mockNext);

            expect(mockTypeService.getTypeByName).not.toHaveBeenCalled();
            expect(mockTypeService.createType).not.toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(new InvalidRequestInputError('"name" is required'));
        });
    });

    describe('getTypeCounters', () => {
        beforeEach(() => {
            typeController = new TypeController(mockTypeService);
            jest.clearAllMocks();
          });

        it('should return type counters for a given type name', async () => {
          const typeName = 'test';
          const counters = { count: 10 };
          mockTypeService.getTypeCounters.mockResolvedValue(counters);
          mockRequest.params = { name: typeName };
    
          await typeController.getTypeCounters()(mockRequest, mockResponse, mockNext);
    
          expect(mockTypeService.getTypeCounters).toHaveBeenCalledWith([typeName]);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith(counters);
        });
    
        it('should handle errors and pass them to the next middleware', async () => {
          const error = new Error('Unexpected error occurred');
          mockTypeService.getTypeCounters.mockRejectedValue(error);
    
          await typeController.getTypeCounters()(mockRequest, mockResponse, mockNext);

          expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getTypeById', () => {
        it('should return type details for a given type ID', async () => {
          const typeId = '123';
          const type = { id: typeId, name: 'test', color: '#FFFFFF' };
          (mockTypeService.getTypeById as jest.Mock).mockResolvedValue(type);
          mockRequest.params = { id: typeId };
    
          await typeController.getTypeById()(mockRequest, mockResponse, mockNext);
    
          expect(mockTypeService.getTypeById).toHaveBeenCalledWith(typeId);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith(type);
        });
    
        it('should throw NotFoundError if type is not found', async () => {
          const typeId = '123';
          (mockTypeService.getTypeById as jest.Mock).mockResolvedValue(undefined);
          mockRequest.params = { id: typeId };
    
          await typeController.getTypeById()(mockRequest, mockResponse, mockNext);
    
          expect(mockTypeService.getTypeById).toHaveBeenCalledWith(typeId);
          expect(mockNext).toHaveBeenCalledWith(new NotFoundError());
        });
    
        it('should handle errors and pass them to the next middleware', async () => {
          const error = new Error('Unexpected error occurred');
          (mockTypeService.getTypeById as jest.Mock).mockRejectedValue(error);
    
          await typeController.getTypeById()(mockRequest, mockResponse, mockNext);

          expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateType', () => {
        it('should update a type successfully', async () => {
          const id = '123';
          const type = { name: 'Test', color: 'red' };
          mockRequest.params = { id };
          mockRequest.body = type;
          mockTypeService.updateType = jest.fn().mockReturnValue(type);
          mockResponse.status = jest.fn().mockReturnValue(mockResponse);
          mockResponse.json = jest.fn().mockReturnValue(mockResponse);

          await typeController.updateType()(mockRequest, mockResponse, mockNext);

          expect(mockTypeService.updateType).toHaveBeenCalledWith(id, type);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({ status: 200, message: 'success', data: { id } });
        });
    
        it('should throw an error if request body is invalid', async () => {
            mockRequest.body = { color: 'red' };

            await typeController.updateType()(mockRequest, mockResponse, mockNext);

            expect(mockTypeService.updateType).not.toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(new InvalidRequestInputError('"name" is required'));
        });
      });
});