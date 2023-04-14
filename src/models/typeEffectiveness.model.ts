import { DataTypes } from 'sequelize';
import { TypeEffectiveness } from '../interfaces';
import sequelize from '../infrastructure/sequelize.orm';

TypeEffectiveness.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sourceId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        targetId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        effectiveness: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
  },
  {
    sequelize,
    tableName: 'typeEffectiveness',
  }
);

export default TypeEffectiveness;
