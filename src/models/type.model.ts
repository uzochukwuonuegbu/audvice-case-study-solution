import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../infrastructure/sequelize.orm';

interface TypeAttributes {
  id?: number;
  name: string;
  color: string;
  dual_typing?: Type;
}

export class Type extends Model<TypeAttributes> implements TypeAttributes {
  public id!: number;
  public name!: string;
  public color!: string;
  public dual_typing?: Type;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  dual_typing_id: string;
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
    },
    dual_typing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Type',
  }
);