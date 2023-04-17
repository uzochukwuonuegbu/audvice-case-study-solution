import Joi from 'joi';

export const createTypeEffectivenessSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetId: Joi.string().required(),
  effectiveness: Joi.number().required()
});