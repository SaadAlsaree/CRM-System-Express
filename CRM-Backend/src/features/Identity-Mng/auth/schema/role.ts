import Joi, { ObjectSchema } from 'joi';



export const addRoleSchema: ObjectSchema = Joi.object({
  roleName: Joi.string().required(),
  roleCode: Joi.string().required(),
});
