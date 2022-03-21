import { Router, Request, Response, NextFunction } from 'express';
import { createValidator } from 'express-joi-validation';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid_v4 } from 'uuid';

import { IController } from '../../interfaces/controller.interfaces';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import HttpException from '../../exceptions/HttpException';
import Logger from '../../lib/logger';
import authorize from '../../middleware/authorize.middleware';
import { EncryptionService } from '../../utils/encryption';
import { authConfig } from '../../config';
import { Auth } from '../../utils';

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
        this.userService = new UserService(User, new EncryptionService(), new Auth(authConfig));
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post(`${this.path}/login`, this.validator.body(valid.UserLoginSchema), this.login);
        this.router.get(this.path, authorize, this.getSuggestions);
        this.router.post(this.path, this.validator.body(valid.UserBodySchema), this.createUser);
        this.router.get(`${this.path}/:id`, authorize, this.getUserById);
        this.router.patch(
            `${this.path}/:id`,
            authorize,
            this.validator.body(valid.UserUpdateBodySchema),
            this.updateUser,
        );
        this.router.delete(`${this.path}/:id`, authorize, this.deleteUser);
    }

    login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { login, password } = request.body;
            Logger.info(`${login} is attempting to login.`);
            const userDto = await this.userService.loginUser(login, password);
            if (userDto instanceof Error) {
                throw userDto;
            }
            Logger.info(`${login} logged in successfully.`);
            response.status(StatusCodes.OK).json(userDto);
        } catch (error) {
            if (error instanceof Error) {
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const data = await this.userService.findById(id);
            if (data instanceof HttpException) throw data;
            response.send(data.toJSON());
        } catch (error) {
            if (error instanceof Error) {
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const user: IUserBase = request.body;
            const payload: UserAttributes = {
                id: uuid_v4(),
                ...user,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const userId = await this.userService.createUser(payload);
            response.status(StatusCodes.CREATED).json({ userId });
        } catch (error) {
            if (error instanceof Error) {
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    updateUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const payload: Partial<IUser> = { ...request.body, updatedAt: new Date() };
            const data = await this.userService.updateUser(id, payload);
            if (data instanceof HttpException) throw new UserNotFoundException(id);
            const updatedUser = data.toJSON();
            response.send(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };

    deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const data = await this.userService.deleteUser(id);
            response.send(`Deleted ${data} user(s).`);
        } catch (error) {
            if (error instanceof Error) {
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
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
                return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
            }
            return next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong'));
        }
    };
}

export default UserController;
