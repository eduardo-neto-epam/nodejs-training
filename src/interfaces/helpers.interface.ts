import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

import InMemoryDatabase from '../database';
import { IBaseRecord } from '../database/db.interfaces';

export interface IHelperArgsWithValidation<T extends IBaseRecord, S extends ValidatedRequestSchema> {
    db: InMemoryDatabase<T>;
    request: ValidatedRequest<S>;
    response: Response;
    next: NextFunction;
}

export interface IHelperArgs<T extends IBaseRecord> {
    db: InMemoryDatabase<T>;
    request: Request;
    response: Response;
    next: NextFunction;
}
