import { Router, Request, Response, NextFunction } from 'express';
import { IUser } from './user.interface';
import { IController } from '../interfaces/controller.interface';
import { v4 as uuid_v4 } from 'uuid';
import HttpException from '../exceptions/HttpException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import InMemoryDatabase from '../database';
import { loader } from '../database/loader';
import UserAdapter from './user.adapter';

class UserController implements IController {
    public path = '/users';
    public router = Router();

    private usersDb = new InMemoryDatabase<IUser>();

    constructor() {
        this.initializeRoutes();
        loader('src/database/data.json', new UserAdapter(this.usersDb));
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.getSuggestions);
        this.router.post(this.path, this.createUser);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const user = await this.usersDb.getById(id);
            if (user) {
                if (user.isDeleted) {
                    next(new UserNotFoundException(id));
                } else {
                    response.send(user);
                }
            } else {
                next(new UserNotFoundException(id));
            }
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(500, `Unable to get user with id ${id}. Error: ${error.message}`));
            }
        }
    };

    createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const user: IUser = { id: uuid_v4(), ...request.body, isDeleted: false };
        try {
            const newUser = await this.usersDb.create(user);
            newUser ? response.send(newUser) : next(new UserNotFoundException(user.id));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(500, `Unable to create user. Error: ${error.message}`));
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
                next(
                    new HttpException(
                        500,
                        `An Error occurred when updating user with id ${id}. Error: ${error.message}`,
                    ),
                );
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
                next(
                    new HttpException(
                        500,
                        `An Error occurred when updating user with id ${id}. Error: ${error.message}`,
                    ),
                );
            }
        }
    };

    getSuggestions = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { pattern, order, limit } = request.query;
        let parsedLimit = 0;
        let users: IUser[];
        let processedUsers: IUser[] = [];
        const filterDeleted = (item: IUser) => !item.isDeleted;
        const filterByPattern = (item: IUser) => item.login.includes(pattern as string);
        const sortSuggestions = (a: IUser, b: IUser) =>
            order === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login);
        try {
            users = await this.usersDb.get();
            processedUsers = users.filter(filterDeleted);
            if (typeof limit === 'string') {
                parsedLimit = parseInt(limit, 10);
            }
            if (typeof pattern === 'string' && pattern.length > 0) {
                processedUsers = processedUsers.filter(filterByPattern);
            }
            if (typeof order === 'string') {
                processedUsers.sort(sortSuggestions);
            }
            if (parsedLimit) {
                processedUsers = processedUsers.slice(0, parsedLimit);
            }
            response.send(processedUsers);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(500, `An Error occurred when retrieving users. Error: ${error.message}`));
            }
        }
    };
}

export default UserController;
