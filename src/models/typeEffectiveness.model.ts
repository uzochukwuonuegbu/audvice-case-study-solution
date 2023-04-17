import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../infrastructure/sequelize.orm';
import { TypeEffectiveness } from '../interfaces';

TypeEffectiveness.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false
          },
        sourceId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        targetId: {
            type: DataTypes.UUIDV4,
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
