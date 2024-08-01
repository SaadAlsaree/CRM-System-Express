import Joi, { ObjectSchema } from 'joi';


const changePasswordSchema: ObjectSchema = Joi.object().keys({
  currentPassword: Joi.string().required().min(6).max(32).messages({
    'string.base': 'Password should be a type of string',
    'string.min': 'Password must have a minimum length of {#limit}',
    'string.max': 'Password should have a maximum length of {#limit}',
    'string.empty': 'Password is a required field'
  }),
  newPassword: Joi.string().required().min(6).max(32).messages({
    'string.base': 'Password should be a type of string',
    'string.min': 'Password must have a minimum length of {#limit}',
    'string.max': 'Password should have a maximum length of {#limit}',
    'string.empty': 'Password is a required field'
  }),
  confirmPassword: Joi.any().equal(Joi.ref('newPassword')).required().messages({
    'any.only': 'Confirm password does not match new password.'
  })
});

const notificationSettingsSchema: ObjectSchema = Joi.object().keys({
  messages: Joi.boolean().required().messages({
    'boolean.base': 'Messages should be a type of boolean',
    'boolean.empty': 'Messages is a required field'
  }),
  comments: Joi.boolean().required().messages({
    'boolean.base': 'Comments should be a type of boolean',
    'boolean.empty': 'Comments is a required field'
  }),
  follows: Joi.boolean().required().messages({
    'boolean.base': 'Follows should be a type of boolean',
    'boolean.empty': 'Follows is a required field'
  }),
  tickets: Joi.boolean().required().messages({
    'boolean.base': 'Tickets should be a type of boolean',
    'boolean.empty': 'Tickets is a required field'
  }),
  tasks: Joi.boolean().required().messages({
    'boolean.base': 'Tasks should be a type of boolean',
    'boolean.empty': 'Tasks is a required field'
  }),
  cases: Joi.boolean().required().messages({
    'boolean.base': 'Projects should be a type of boolean',
    'boolean.empty': 'Projects is a required field'
  })
});

const userInfoSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().messages({
    'string.base': 'Username should be a type of string',
    'string.empty': 'Username is a required field'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string',
    'string.empty': 'Email is a required field',
    'string.email': 'Email must be a valid email'
  }),
  phone: Joi.string().required().messages({
    'string.base': 'Phone should be a type of string',
    'string.empty': 'Phone is a required field'
  }),
  address: Joi.string().required().messages({
    'string.base': 'Address should be a type of string',
    'string.empty': 'Address is a required field'
  }),
  work: Joi.string().optional()
});

export { changePasswordSchema, notificationSettingsSchema, userInfoSchema };
