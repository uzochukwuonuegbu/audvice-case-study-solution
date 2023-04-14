import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/sequelize.orm';


interface TypeAttributes {
  id?: string;
  name: string;
  color: string;
}

export class Type extends Model<TypeAttributes> implements TypeAttributes {
  public id!: string;
  public name!: string;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Type',
  }
);