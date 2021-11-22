import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createValidator } from 'express-joi-validation';
import { v4 as uuid_v4 } from 'uuid';

import { IController } from '../interfaces/controller.interfaces';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import HttpException from '../exceptions/HttpException';

import { IUser, IUserBase, UserAttributes } from './user.interfaces';
import { User } from './user.model';
import UserService from './user.service';
import * as valid from './user.validation';

class UserController implements IController {
    public path = '/users';
    public router = Router();

    private validator = createValidator();
    private userService: UserService;

    constructor() {
        this.userService = new UserService(User);
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.getSuggestions);
        this.router.post(this.path, this.validator.body(valid.UserBodySchema), this.createUser);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.validator.body(valid.UserUpdateBodySchema), this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        const data = await this.userService.findById(id).catch((e) => next(e));
        let user = {};
        if (data instanceof HttpException) next(data);
        if (!data) next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Unable to get user'));
        if (data instanceof User) {
            user = data.toJSON();
        }
        response.send(user);
    };

    createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const userDTO: IUserBase = request.body;
            const payload: UserAttributes = {
                id: uuid_v4(),
                ...userDTO,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newId = await this.userService.createUser(payload);
            if (!newId) next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
            response.send(newId);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    updateUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const payload: Partial<IUser> = { ...request.body, updatedAt: new Date() };
            const data = await this.userService.updateUser(id, payload);
            let updatedUser = {};
            if (data instanceof HttpException) next(new UserNotFoundException(id));
            if (data instanceof User) {
                updatedUser = data.toJSON();
            }
            response.send(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const userId = await this.userService.deleteUser(id);
            if (userId instanceof HttpException) {
                const exception = userId;
                next(exception);
            }
            response.send(userId);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    getSuggestions = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { pattern, order, limit } = request.query;
        let parsedLimit = 0;
        if (typeof limit === 'string') {
            parsedLimit = parseInt(limit, 10);
        }
        const params = {
            pattern: pattern as string,
            order: order as string,
            limit: parsedLimit,
        };
        try {
            const users = await this.userService.getSuggestions(params);
            response.send(users);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
        }
    };
}

export default UserController;
