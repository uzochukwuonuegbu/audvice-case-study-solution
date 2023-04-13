import { Model, DataTypes } from 'sequelize';
import {sequelize } from '../infrastructure/sequelize.orm';

interface TypeEffectivenessAttributes {
    id?: string;
    sourceId: string;
    targetId: string;
    effectiveness: number;
  }
  
export class TypeEffectiveness extends Model<TypeEffectivenessAttributes> implements TypeEffectivenessAttributes {
    public id!: string;
    public sourceId!: string;
    public targetId!: string;
    public effectiveness!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
    modelName: 'typeEffectiveness',
  }
);

// module.exports = TypeEffectiveness;