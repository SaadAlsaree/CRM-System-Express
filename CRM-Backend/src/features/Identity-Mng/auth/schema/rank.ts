import Joi, { ObjectSchema } from 'joi';

export const addRankSchema: ObjectSchema = Joi.object({
  rankName: Joi.string().required(),
  rankCode: Joi.string().required(),
});
