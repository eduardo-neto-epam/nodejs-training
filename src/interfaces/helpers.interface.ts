import { Request, Response, NextFunction } from 'express';

import InMemoryDatabase from '../database';
import { IBaseRecord } from '../database/db.interfaces';

export interface IHelperArgs<T extends IBaseRecord> {
    db: InMemoryDatabase<T>;
    request: Request;
    response: Response;
    next: NextFunction;
}
