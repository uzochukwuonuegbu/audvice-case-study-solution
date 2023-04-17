import { Sequelize } from 'sequelize';
import { Type } from '../../src/models';

describe('PostgreSQL integration test', () => {
    const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/postgres', {
      dialect: 'postgres',
      logging: false,
    });
  
    beforeAll(async () => {
      await sequelize.authenticate();
    });
  
    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  
    describe('Type model', () => {
      it('should be able to create a new Type', async () => {
        const type = await Type.create({
          name: 'Fire',
          color: '#FF4500',
        });
  
        expect(type.id).toBeTruthy();
        expect(type.name).toBe('Fire');
        expect(type.color).toBe('#FF4500');
      });
  
      it('should be able to retrieve a Type by id', async () => {
        const createdType = await Type.create({
          name: 'Water',
          color: '#0077BE',
        });
  
        const retrievedType = await Type.findByPk(createdType.id);
  
        expect(retrievedType?.id).toBe(createdType.id);
        expect(retrievedType?.name).toBe(createdType.name);
        expect(retrievedType?.color).toBe(createdType.color);
      });
  
      it('should be able to update a Type', async () => {
        const createdType = await Type.create({
          name: 'Grass',
          color: '#4CAF50',
        });
  
        await createdType.update({
          name: 'Electric',
          color: '#FFEB3B',
        });
  
        const updatedType = await Type.findByPk(createdType.id);
  
        expect(updatedType?.id).toBe(createdType.id);
        expect(updatedType?.name).toBe('Electric');
        expect(updatedType?.color).toBe('#FFEB3B');
      });
  
      it('should be able to delete a Type', async () => {
        const createdType = await Type.create({
          name: 'Dragon',
          color: '#7038F8',
        });
  
        await createdType.destroy();
  
        const deletedType = await Type.findByPk(createdType.id);
  
        expect(deletedType).toBeNull();
      });
    });
  });