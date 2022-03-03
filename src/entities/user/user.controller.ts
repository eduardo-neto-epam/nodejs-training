import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createValidator } from 'express-joi-validation';
import { v4 as uuid_v4 } from 'uuid';

import { IController } from '../../interfaces/controller.interfaces';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import HttpException from '../../exceptions/HttpException';
import { signJWT } from '../../utils';
import Logger from '../../lib/logger';
import getJWT from '../../middleware/getJWT.middleware';

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
        this.router.get(`${this.path}/validate_token`, getJWT, this.validateToken);
        this.router.post(`${this.path}/login`, this.validator.body(valid.UserLoginSchema), this.login);
        this.router.get(this.path, getJWT, this.getSuggestions);
        this.router.post(this.path, this.validator.body(valid.UserBodySchema), this.createUser);
        this.router.get(`${this.path}/:id`, getJWT, this.getUserById);
        this.router.patch(`${this.path}/:id`, getJWT, this.validator.body(valid.UserUpdateBodySchema), this.updateUser);
        this.router.delete(`${this.path}/:id`, getJWT, this.deleteUser);
    }

    validateToken = async (
        _request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<unknown, Record<string, unknown>>> => {
        try {
            Logger.info('token validated, user is Authorized.');

            return response.status(200).json({
                message: 'Authorized',
            });
        } catch (error) {
            return next(error);
        }
    };

    login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { login, password } = request.body;
            Logger.info(`${login} is attempting to login.`);
            const user = await this.userService.loginUser(login, password);
            if (user instanceof HttpException) throw user;
            signJWT(user, (err, token) => {
                if (err) {
                    throw new HttpException(StatusCodes.UNAUTHORIZED, err.message);
                } else if (token) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...userData } = user;
                    Logger.info(`Login attempt was successful.`);
                    return response.status(200).json({ userData, token });
                }
                return response.status(StatusCodes.UNAUTHORIZED).json('Unauthorized');
            });
        } catch (error) {
            next(error);
        }
    };

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const data = await this.userService.findById(id);
            if (data instanceof HttpException) throw new HttpException(data.status, data.message);
            response.send(data.toJSON());
        } catch (error) {
            next(error);
        }
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
            const userId = await this.userService.createUser(payload);
            response.status(201).json({ userId });
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
            next(error);
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
