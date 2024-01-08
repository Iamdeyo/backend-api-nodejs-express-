import Joi from 'joi';

const signUpSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(4).required(),
  }),
};
const signInSchema = {};

export { signUpSchema, signInSchema };

// const testSchema = {
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//   }),
//   params: Joi.object().keys({
//     id: Joi.string().required(),
//   }),
//   query: Joi.object().keys({
//     q: Joi.string().required(),
//   }),
// };
