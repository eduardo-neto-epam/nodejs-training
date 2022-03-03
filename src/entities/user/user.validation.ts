import Joi from 'joi';

import { IUser } from './user.interfaces';

export const UserLoginSchema: Joi.ObjectSchema<IUser> = Joi.object({
    id: Joi.string(),
    login: Joi.string().required().min(3).max(20),
    password: Joi.string()
        .required()
        .min(6)
        .max(30)
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .messages({
            'string.pattern.base': `{#label} must include letters and numbers`,
        }),
});

export const UserBodySchema: Joi.ObjectSchema<IUser> = Joi.object({
    id: Joi.string(),
    login: Joi.string().required().min(3).max(20),
    password: Joi.string()
        .required()
        .min(6)
        .max(30)
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .messages({
            'string.pattern.base': `{#label} must include letters and numbers`,
        }),
    age: Joi.number().required().integer().min(4).max(130),
    isDeleted: Joi.boolean(),
});

export const UserUpdateBodySchema: Joi.ObjectSchema<IUser> = Joi.object({
    id: Joi.string(),
    login: Joi.string().min(3).max(20),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')).messages({
        'string.pattern.base': `{#label} must include letters and numbers`,
    }),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean(),
});
