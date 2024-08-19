import Joi, { ObjectSchema } from 'joi';


const newOrganizationSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(50).messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required',
  }),
  code: Joi.string().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  email: Joi.string().email().optional(),
  website: Joi.string().optional(),
  description: Joi.string().required(),
  avatar: Joi.string().optional(),
});






export { newOrganizationSchema };
