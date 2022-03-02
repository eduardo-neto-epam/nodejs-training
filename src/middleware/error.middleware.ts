import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/HttpException';
import Logger from '../lib/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(error: HttpException, request: Request, response: Response, _next: NextFunction): void {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    const method = request.method;
    const args = {
        params: request.params,
        query: request.query,
        body: request.body,
    };
    Logger.error(
        `Status: ${status}. Message: ${message}. ${method ? 'Method: ' + method + ', ' : ''} ${
            args ? 'Args: ' + JSON.stringify(args) + ', ' : ''
        } `,
    );
    response.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
