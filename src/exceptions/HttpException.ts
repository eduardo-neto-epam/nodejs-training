import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HttpException extends Error {
    status: number;
    constructor(status: StatusCodes, message?: string) {
        super();
        this.status = status;
        this.message = message ? `${getReasonPhrase(status)}. ${message}` : getReasonPhrase(status);
    }
}

export default HttpException;
