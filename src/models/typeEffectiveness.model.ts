import { Model, DataTypes } from 'sequelize';
import {sequelize } from '../infrastructure/sequelize.orm';

class TypeEffectiveness extends Model {}

TypeEffectiveness.init(
  {
    effectiveness: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'typeEffectiveness',
  }
);

module.exports = TypeEffectiveness;