import { StatusCodes } from 'http-status-codes';

import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
    constructor(id: string) {
        super(StatusCodes.NOT_FOUND, `User with id ${id} not found.`);
    }
}

export default UserNotFoundException;
