import { Request, Response, NextFunction, Router } from 'express';
import { ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import InMemoryDatabase from '../database';
import { IBaseRecord } from '../database/db.interfaces';

export interface IController {
    path: string;
    router: Router;
    initializeRoutes: () => void;
}

export interface IControllerHandlerArgs<T extends IBaseRecord, S extends ValidatedRequestSchema | null> {
    db: InMemoryDatabase<T>;
    request: S extends ValidatedRequestSchema ? ValidatedRequest<S> : Request;
    response: Response;
    next: NextFunction;
}
