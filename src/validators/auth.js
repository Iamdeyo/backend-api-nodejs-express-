import Joi from 'joi';

const signUpSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string().trim().email().required(),
      username: Joi.string().trim().alphanum().min(4).max(20).required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.ref('password'),
      firstName: Joi.string().max(20).required(),
      lastName: Joi.string().max(20).required(),
    })
    .with('password', 'confirmPassword'),
};
const signInSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string().trim().email(),
      username: Joi.string().trim().alphanum().min(4).max(20),
      password: Joi.string().min(6).required(),
    })
    .xor('email', 'username'),
};

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
