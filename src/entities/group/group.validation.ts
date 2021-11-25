import Joi from 'joi';

import { IGroup } from './group.interfaces';

export const GroupBodySchema: Joi.ObjectSchema<IGroup> = Joi.object({
    id: Joi.string(),
    name: Joi.string().required().min(3).max(20),
    permissions: Joi.array().required().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});

export const GroupUpdateBodySchema: Joi.ObjectSchema<IGroup> = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(3).max(20),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});
