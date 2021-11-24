import { StatusCodes } from 'http-status-codes';

import HttpException from './HttpException';

class GroupNotFoundException extends HttpException {
    constructor(id: string) {
        super(StatusCodes.NOT_FOUND, `Group with id ${id} not found.`);
    }
}

export default GroupNotFoundException;
