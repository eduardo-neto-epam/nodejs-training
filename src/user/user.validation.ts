import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

export interface IUserBodySchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    };
}

export const UserBodySchema = Joi.object({
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

export const UserUpdateBodySchema = Joi.object({
    id: Joi.string(),
    login: Joi.string(),
    password: Joi.string(),
    age: Joi.number(),
    isDeleted: Joi.boolean(),
});
