import Joi, { ObjectSchema } from 'joi';

export const loginSchema: ObjectSchema = Joi.object({
  userLogin: Joi.string().required(),
  password: Joi.string().required(),
});


export const registerSchema: ObjectSchema = Joi.object({
  userLogin: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  avatarColor: Joi.string().required(),
  role: Joi.array().items(Joi.string()).required(),
  rank: Joi.string().required(),
  organizationId: Joi.string().required(),
  departmentId: Joi.string().optional(),
});
