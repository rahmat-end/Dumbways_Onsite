import * as Joi from "joi"

export const threadSchema = Joi.object({
  content: Joi.string().required(),
  image: Joi.string().required(),
  user: Joi.number().required()
})