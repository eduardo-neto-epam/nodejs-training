import HttpException from './HttpException';

class InvalidIDException extends HttpException {
    constructor(id: string) {
        super(400, `id ${id} is invalid`);
    }
}

export default InvalidIDException;
