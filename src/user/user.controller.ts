import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid_v4 } from 'uuid';
import { createValidator } from 'express-joi-validation';

import { IController } from '../interfaces/controller.interfaces';
import InMemoryDatabase from '../database';
import DbAdapter from '../database/db.adapter';
import loader from '../database/loader';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import HttpException from '../exceptions/HttpException';
import { processedDataByQueryParams } from '../utils';

import { IUser } from './user.interfaces';
import * as valid from './user.validation';

const PATH_TO_DUMMY_DATA = process.env.PATH_TO_DUMMY_DATA as string;

class UserController implements IController {
    public path = '/users';
    public router = Router();

    private usersDb: InMemoryDatabase<IUser>;
    private validator = createValidator();

    constructor(db: InMemoryDatabase<IUser>) {
        this.usersDb = db;
        this.initializeRoutes();
        loader(PATH_TO_DUMMY_DATA, new DbAdapter<IUser, InMemoryDatabase<IUser>>(this.usersDb));
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
        try {
            const user = await this.usersDb.findById(id);
            if (!user || user.isDeleted) {
                next(new UserNotFoundException(id));
            }
            response.send(user);
        } catch (error) {
            next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
        }
    };

    createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const payload: IUser = { id: uuid_v4(), ...request.body, isDeleted: false };
        try {
            const newUser = await this.usersDb.create(payload);
            newUser ? response.send(newUser) : next(new HttpException(StatusCodes.BAD_REQUEST));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
        }
    };

    updateUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const updatedUser = await this.usersDb.update(id, request.body);
            updatedUser ? response.send(updatedUser) : next(new UserNotFoundException(id));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
        }
    };

    deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const deletedUser = await this.usersDb.delete(id);
            deletedUser ? response.send(deletedUser.id) : next(new UserNotFoundException(id));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
        }
    };

    getSuggestions = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { pattern, order, limit } = request.query;
        let parsedLimit = 0;
        let processedUsers: IUser[] = [];
        if (typeof limit === 'string') {
            parsedLimit = parseInt(limit, 10);
        }
        const params = {
            pattern: pattern as string,
            order: order as string,
            limit: parsedLimit,
        };
        try {
            const users = await this.usersDb.findAll();
            processedUsers = processedDataByQueryParams(users, params);
            response.send(processedUsers);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
        }
    };
}

export default UserController;
