import * as Joi from "joi"

export const userSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profile_picture: Joi.string().required(),
  profile_description: Joi.string().required()
})

export const userSchemaEdit = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  profile_description: Joi.string().required()
})

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})