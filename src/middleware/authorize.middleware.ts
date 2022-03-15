import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Logger from '../lib/logger';
import { authConfig } from '../config';

const authorize = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response<unknown, Record<string, unknown>> | undefined => {
    Logger.info('Validating Token');

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        Logger.error('Unauthorized - Missing Token');
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Unauthorized',
        });
    }
    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
            Logger.error('Unauthorized - Invalid Token');
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
                error,
            });
        }
        res.locals.jwt = decoded;
        return next();
    });
    return;
};

export default authorize;
