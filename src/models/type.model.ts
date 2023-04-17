import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../infrastructure/sequelize.orm';
import { Type } from '../interfaces';

Type.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false
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
    tableName: 'types',
  }
);

export default Type;