import { DataTypes, Op } from 'sequelize';
import { ITypeRepository, Type } from '../interfaces';
// import sequelize from '../infrastructure/sequelize.orm';

export class TypeRepository implements ITypeRepository {
    constructor(private dbClient: typeof Type) {
        // this.dbClient = Types.init(
        //     {
        //       id: {
        //         type: DataTypes.INTEGER,
        //         autoIncrement: true,
        //         primaryKey: true,
        //       },
        //       name: {
        //         type: DataTypes.STRING,
        //         allowNull: false,
        //         unique: true,
        //       },
        //       color: {
        //         type: DataTypes.STRING,
        //         allowNull: false,
        //       }
        //     },
        //     {
        //       sequelize,
        //       modelName: 'types',
        //     }
        //   );
    }

    public async create(typeData) {
        const type = new Type(typeData);
        await type.save();
        return type;
    }

    public async findById(id) {
        console.log({ db: this.dbClient })
        return this.dbClient.findByPk(id);
    }

    public async find(query?: any) {
        return this.dbClient.findOne(query);
    }

    public async update(id, updates) {
        await this.dbClient.update(id, updates);
        // return type;
    }

    public async delete(id) {
        await this.dbClient.destroy(id);
    }

    public async findAll(query?: any) {
        return this.dbClient.findAll(query);
    }

    public async findByTypeNames(names) {
        return this.dbClient.findAll({ where: { name: { [Op.in]: names } } });
    }
}