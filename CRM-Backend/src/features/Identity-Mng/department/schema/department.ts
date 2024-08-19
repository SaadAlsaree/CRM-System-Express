import Joi, { ObjectSchema } from 'joi';


const newDepartmentSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  description: Joi.string().optional(),
  directorateId: Joi.string().optional(),
  organizationId: Joi.string().optional(),
}).xor('directorateId', 'organizationId');

export { newDepartmentSchema };
