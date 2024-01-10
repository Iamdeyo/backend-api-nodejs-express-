import Joi from 'joi';

const changePasswordSchema = {
  body: Joi.object()
    .keys({
      oldPassword: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.ref('password'),
    })
    .with('password', 'confirmPassword'),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const editUserSchema = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().max(20),
      lastName: Joi.string().max(20),
      dateOfBirth: Joi.date(),
    })
    .or('dateOfBirth', 'firstName', 'lastName'),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export { changePasswordSchema, editUserSchema };
