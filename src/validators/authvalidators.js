import Joi from 'joi';

const testSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  query: Joi.object().keys({
    q: Joi.string().required(),
  }),
};

export default testSchema;
