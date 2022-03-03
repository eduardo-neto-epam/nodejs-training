import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import Logger from '../lib/logger';
import { authConfig } from '../config';

const getJWT = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response<string, Record<string, string>> | undefined => {
    Logger.info('Validating Token');

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if (error) {
                Logger.error('Unauthorized - Invalid Token');
                return res.status(404).json({
                    message: error.message,
                    error,
                });
            }
            res.locals.jwt = decoded;
            return next();
        });
    } else {
        Logger.error('Unauthorized - Missing Token');
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    return;
};

export default getJWT;
