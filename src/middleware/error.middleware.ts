import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import HttpException from '../exceptions/HttpException';
import Logger from '../lib/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(error: HttpException, request: Request, response: Response, _next: NextFunction): void {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    const method = request.method;
    const headers = request.headers;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...cleanKeys } = request.body;
    const args = {
        params: request.params,
        query: request.query,
        body: {
            ...cleanKeys,
            password: 'xxxxxxxx',
        },
    };
    Logger.error(
        `Status: ${status}. Message: ${message}. ${method ? 'Method: ' + method + ', ' : ''} ${
            args ? 'Args: ' + JSON.stringify(args) + ', ' : ''
        } Headers: ${JSON.stringify(headers)} `,
    );
    response.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
