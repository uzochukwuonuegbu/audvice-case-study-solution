import { DataTypes } from 'sequelize';
import sequelize from '../infrastructure/sequelize.orm';
import { Type } from '../interfaces';

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
    tableName: 'type',
  }
);

export default Type;