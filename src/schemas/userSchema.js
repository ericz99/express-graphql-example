import Joi from '@hapi/joi';

const userName = Joi.string()
  .min(6)
  .max(50)
  .label('Username');

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .required()
  .label('Password')
  .options({
    language: {
      string: {
        regex: {
          base: 'must have at least one lowercase letter, one uppercase letter, and one digit.'
        }
      }
    }
  });

export const signUp = Joi.object().keys({
  userName,
  email,
  password
});

export const signIn = Joi.object().keys({
  email,
  password
});
