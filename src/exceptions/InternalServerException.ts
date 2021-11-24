import { StatusCodes } from 'http-status-codes';

import HttpException from './HttpException';

class InternalServerException extends HttpException {
    constructor(error?: Error) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, error ? error.message : 'Oops, Something went wrong');
    }
}

export default InternalServerException;
